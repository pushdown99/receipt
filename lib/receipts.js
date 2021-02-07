'use strict';

let dotenv = require('dotenv').config({ path: require('find-config')('.env') })
let moment = require('moment-timezone');
let lib    = require('.');

module.exports = function(app) {

  app.post('/receipt/probe/:license', function (req, res) {
    var license = req.params.license;
    var ticket  = null;
    var user    = null;

    if((ticket = lib.mysql.searchTicketByLicense ([license])) == null) return res.send(req.body.Data);
    if((user = lib.mysql.searchUsersByEmail ([ticket.email])) == null) return res.send(req.body.Data);

    let fcmkey = user.fcmkey;
    let key = lib.utils.generatekey();
    var dat = lib.escp(req.body.Data); // ESC/P decode
    lib.utils.write(`txt/${key}.txt`, dat);
    lib.pdf        (`pdf/${key}.pdf`, dat);

    lib.parser (dat, function (err, parsed) {
      if(err) { return res.send(req.body.Data); }

      var coupons = lib.mysql.searchCouponRcn ([ticket.rcn]);
      var n_promotion  = 0;
      var n_reward     = 0;
      var n_stamp      = 0;
      var c_promotion  = 0;
      var c_reward     = 0;
      var cpurl        = "";
      var rid          = lib.mysql.getTableAutoInc(['receipts']);
      var registered   = moment().format('YYYY-MM-DD HH:mm:ss');
      lib.mysql.putUserDealHistory ([ticket.email, ticket.member, ticket.rcn, "", "거래", lib.utils.toInt(parsed.total)]); 
      if (coupons != null) {
        coupons.forEach(coupon => {
          switch(coupon.ctype) {
          case '프로모션': 
            if(lib.utils.toInt(parsed.total) >= coupon.cash) { 
              n_promotion = 1; 
              c_promotion = 1; 
            lib.mysql.putUserDealHistory ([ticket.email, ticket.member, ticket.rcn, "", "프로모션", 1]); 
              cpurl = `/publish/coupon/${coupon.rcn}/${rid}`; 
            } break;
          case '리워드'  : 
            n_reward = 1; 
            c_reward = 1; 
            lib.mysql.putUserDealHistory ([ticket.email, ticket.member, ticket.rcn, "", "리워드", 1]); 
            cpurl = `/publish/coupon/${coupon.rcn}/${rid}`; 
            break;
          case '스탬프'  : 
            n_stamp  = parseInt(lib.utils.toInt(parsed.total)/coupon.limits); 
            lib.mysql.generateUserStamp ([coupon.id, ticket.email, ticket.rcn]);
            lib.mysql.putUserDealHistory ([ticket.email, ticket.member, ticket.rcn, "", "스탬프", 1]); 
            break;
          }
        });
      }
      var record = [user.email, ticket.member, ticket.rcn, ticket.bzname, ticket.icon, `/txt/${key}.txt`, `/pdf/${key}.pdf`, '현금', lib.utils.toInt(parsed.total), n_promotion, n_reward, n_stamp, c_promotion, c_reward, cpurl, registered];
      var result  = lib.mysql.putReceipts(record);
      lib.utils.sendFcm (process.env.KEY_FCM, fcmkey, `/fcm/${result.insertId}`, function (e, r) {
        lib.mysql.updReceiptsFcmById ([`/fcm/${result.insertId}`, JSON.parse(r).results[0].message_id, result.insertId]);
        // TODO:
        lib.mysql.delTicketByEmail ([ticket.email]);
      });
      return res.send("");
    });
  });

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // Firebase Cloud Message 
  //
  app.post('/fcm/:id', (req, res) => {
    var id = req.params.id;
    var receipt = null;

    if((receipt = lib.mysql.searchReceiptById ([id])) != null) {
      return lib.response(req, res, 200, {list: [receipt]});
    }
  });

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // File download & viewer 
  //
  app.get('/pdf/:f', (req, res) => {
    let f = req.params.f;
    let d = 'pdf';
    let p = `${d}/${f}`;
    let data = require('fs').readFileSync(p);
    res.contentType("application/pdf");
    res.send (data);
  });

  app.get('/txt/:f', (req, res) => {
    let f = req.params.f;
    let d = 'txt';
    let p = `${d}/${f}`;
    let data = require('fs').readFileSync(p);
    res.contentType("text/html");
    res.send (data);
  });

  app.post('/publish/coupon/:rcn/:id', function(req, res){
    var rcn      = req.params.rcn;
    var id       = req.params.id;
    var receipt  = null;
    var timstamp = moment().format('YYYY-MM-DD HH:mm:ss');

    if((receipt  = lib.mysql.searchReceiptById ([id])) == null) return lib.response(req, res, 404);
    var coupons  = lib.mysql.searchAvailMemberCoupon ([rcn, id, rcn, timstamp, timstamp]);
    console.log (coupons);

    lib.response(req, res, 200, { list: coupons });
  });

  app.post('/publish/coupon/:rcn/:id/:cid', function(req, res){
    var rcn     = req.params.rcn;
    var id      = req.params.id ;
    var cid     = req.params.cid;
    var receipt = null;
    var coupon  = null;
    var member  = null;
    var timstamp = moment().format('YYYY-MM-DD HH:mm:ss');

    if((receipt  = lib.mysql.searchReceiptById ([id])) == null) return lib.response(req, res, 404);
    if((coupon   = lib.mysql.searchMemberCouponById ([cid])) == null) return lib.response(req, res, 404);
    if((member   = lib.mysql.searchMemberByRcn ([rcn])) == null) return lib.response(req, res, 404);
    console.log (coupon);
    console.log (member);

    switch(coupon.ctype) {
    case '리워드'  : 
      if(receipt.c_reward == 0) return lib.response(req, res, 404); 
      lib.mysql.incRewardCouponById ([cid]);
      lib.mysql.updReceiptRewardCouponById ([id]); 
      break;
    case '프로모션': 
      if(receipt.c_promotion == 0) return lib.response(req, res, 404); 
      lib.mysql.incPromotionCouponById ([cid]);
      lib.mysql.updReceiptPromotionCouponById ([id]);
      break;
    }

    /////////////////////////////////////////
    // TODO: bzcode -> bzname
    var uid = lib.mysql.getTableAutoInc(['user_coupon']);
    lib.mysql.generateUserCoupon ([receipt.email, receipt.member, receipt.rcn, coupon.bzcode, coupon.ctype, `${coupon.cpcode}-${uid}`, coupon.name, coupon.date1, coupon.date2, coupon.benefit, coupon.notice, member.lat, member.lng]);
    lib.response(req, res, 200);
  });




/*
  app.get('/store/:rcn', function(req, res){
    var rcn   = req.params.rcn;
    var result = lib.mysql.getStoreLicense ([rcn]);
    if(result.length < 1) return lib.response(req, res, 404);

    var register = result[0].register;
    var result = lib.mysql.getGroupCouponRegister([register]);
    if(result.length > 0) result[0].generate = process.env.SERVER + '/publish/coupon/' + register + '/'
    res.contentType("application/json")
    res.send(JSON.stringify(result));
  });

  app.get('/publish/coupon/:register/:email', function(req, res){
    let register  = req.params.register;
    let email     = req.params.email;

    var result = lib.mysql.getGroupCouponRegister ([register]);
    if(result.length < 1) return lib.response(req, res, 404);
    var id       = result[0].id;
    var name     = result[0].name;
    var title    = result[0].title;
    var genre    = result[0].genre;
    var begins   = moment(result[0].begins).format("YYYY-MM-DD HH:mm:ss");
    var ends     = moment(result[0].ends).format("YYYY-MM-DD HH:mm:ss");

    var result = lib.mysql.putCoupon([email, lib.utils.generateCoupon(1), 0, id, name, register, title, genre, begins, ends]);
    var result = lib.mysql.getCouponId([result.insertId]);
    res.contentType("application/json")
    res.send(JSON.stringify(result));
  });
*/

}

