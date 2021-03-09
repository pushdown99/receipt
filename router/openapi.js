'use strict';

const moment  = require('moment-timezone');
const router  = require('.');
const lib     = require('../lib');

function getDistance(lat1, lon1, lat2, lon2) {
    if ((lat1 == lat2) && (lon1 == lon2))
        return 0;

    var radLat1 = Math.PI * lat1 / 180;
    var radLat2 = Math.PI * lat2 / 180;
    var theta = lon1 - lon2;
    var radTheta = Math.PI * theta / 180;
    var dist = Math.sin(radLat1) * Math.sin(radLat2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);
    if (dist > 1)
        dist = 1;

    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515 * 1.609344 * 1000;
    if (dist < 100) dist = Math.round(dist / 10) * 10;
    else dist = Math.round(dist / 100) * 100;

    return dist;
}

module.exports = function(app) {

  // SIGN-IN
  app.post("/sign-in", function (req, res) {
    var email  = (req.body.id != undefined)? req.body.id: req.body.email;
    var passwd = (req.body.pwd!= undefined)? req.body.pwd: req.body.passwd;
    var fcmkey = req.body.key;
    var user = null;

    if (email == undefined || passwd == undefined || fcmkey == undefined) return lib.response(req, res, 400);

    if((user = lib.mysql.searchUsersByEmail ([email])) == null) return lib.response(req, res, 401);
    if(user.status != '가입')  return lib.response(req, res, 401);
    if(user.passwd != passwd) return lib.response(req, res, 402);

    if(user.activated != "Y") return lib.response(req, res, 203);

    var ret = lib.mysql.updUser([fcmkey, email]);
    if(ret.affectedRows > 0) return lib.response(req, res, 200,  {list: [user]});

    return lib.response(req, res, 409);
  });

  app.post("/sign-in/profile", function (req, res) {
    var email = req.body.email;
    var user  = null;

    if (email == undefined) return lib.response(req, res, 404);
    if((user = lib.mysql.searchUsersByEmail ([email])) == null) return lib.response(req, res, 404);
    return lib.response(req, res, 200, {list: [user]});
  });

  app.post("/sign-in/resign", function (req, res) {
    var email = req.body.email;
    var user  = null;

    if (email == undefined) return lib.response(req, res, 404);
    if((user = lib.mysql.searchUsersByEmail ([email])) == null) return lib.response(req, res, 404);
    lib.mysql.resignUserByEmail ([email]);
    return lib.response(req, res, 200);
  });

  app.post('/sign-in/auth/email', function(req, res) {
    var email = req.body.email;
    var user = null;
    if(email == undefined) return lib.response(req, res, 404);

    if((user = lib.mysql.searchUsersByEmail ([email])) == null) return lib.response(req, res, 404);
    lib.mysql.delUserAuthTokenEmail ([email]);

    var expire = moment().tz('Asia/Seoul').add(7, 'd').format('YYYY-MM-DD 23:59:59');
    let token  = lib.utils.generatekey ();
    var ret = lib.mysql.putUserAuthToken ([email, token, expire]);
    if(ret.affectedRows < 1) return lib.response(req, res, 498);

    var url     = `https://tric.kr/sign-up/confirm/${email}/${token}`;
    var message = lib.utils.getSignUpEmailMessage (email, url, expire);
    var title   = lib.utils.getSignUpEmailTitle();

    lib.utils.mailto ('popup@naver.com', 'aq175312#$', email, title, message, function (err, info) {
      if(err) console.log (err);
      return lib.response(req, res, 200, {token: token});
    });
  });

  app.post("/sign-in/generate-token", function (req, res) {
    let email  = req.body.email;
    if (email == undefined) return lib.response(req, res, 404);

    lib.mysql.delUserAuthTokenEmail ([email]);
    var expire = moment().tz('Asia/Seoul').add(7, 'd').format('YYYY-MM-DD 23:59:59');
    let token  = lib.utils.generatekey ('digits', 6);
    var ret = lib.mysql.putUserAuthToken ([email, token, expire]);
    if(ret.affectedRows < 1) return lib.response(req, res, 498);

    var message = lib.utils.getPasswdEmailMessage (email, token, expire);
    var title   = lib.utils.getPasswdEmailTitle();

    lib.utils.mailto ('popup@naver.com', 'aq175312#$', email, title, message, function (err, info) {
      if(err) console.log (err);
      return lib.response(req, res, 200, {token: token});
    });
  });

  app.post("/sign-in/change-passwd", function (req, res) {
    let email  = req.body.email;
    let passwd = req.body.passwd;
    let token  = req.body.token;

    var ret = lib.mysql.getUserEmail ([email]);
    if(ret.length < 1) return lib.response(req, res, 208);

    var ret = lib.mysql.getUserAuthTokenEmail ([email]);
    if(ret.length < 1) return lib.response(req, res, 404);

    if(ret[0].token != token) return lib.response(req, res, 404);
    ret = lib.mysql.delUserAuthTokenEmail ([email]);
    if(ret.affectedRows < 1) return lib.response(req, res, 409);
    ret = lib.mysql.updUserPasswd ([passwd, email]);
    if(ret.affectedRows < 1) return lib.response(req, res, 409);

    return lib.response(req, res, 200);
  });

  app.post("/sign-in/change-passwd-no-token", function (req, res) {
    let email  = req.body.email;
    let passwd = req.body.passwd;
    let token  = req.body.token;

    var ret = lib.mysql.getUserEmail ([email]);
    if(ret.length < 1) return lib.response(req, res, 208);

    ret = lib.mysql.updUserPasswd ([passwd, email]);
    if(ret.affectedRows < 1) return lib.response(req, res, 409);

    return lib.response(req, res, 200);
  });

  // SIGN-UP
  app.post('/sign-up', function(req, res) {
    let email  = (req.body.id != undefined)? req.body.id: req.body.email;
    let passwd = (req.body.pwd!= undefined)? req.body.pwd: req.body.passwd;
    let year   = (req.body.year!= undefined)? req.body.year: '';
    let month  = (req.body.month!= undefined)? req.body.month: '';
    let day    = (req.body.day!= undefined)? req.body.day: '';
    let gender = (req.body.gender!= undefined)? req.body.gender: '';
    let area1  = (req.body.area1!= undefined)? req.body.area1: '';
    let area2  = (req.body.area2!= undefined)? req.body.area2: '';

    if(email == undefined || passwd == undefined) return lib.response(req, res, 404);

    var ret = lib.mysql.getUserEmail ([email]);
    if(ret.length > 0) return lib.response(req, res, 208);

    var ret = lib.mysql.putUser([email, passwd, year, month, day, gender, area1, area2]);
    if(ret.affectedRows < 1) return lib.response(req, res, 409);

    lib.mysql.delUserAuthTokenEmail ([email]);

    var expire = moment().tz('Asia/Seoul').add(7, 'd').format('YYYY-MM-DD 23:59:59');
    let token  = lib.utils.generatekey ();
    var ret = lib.mysql.putUserAuthToken ([email, token, expire]);
    if(ret.affectedRows < 1) return lib.response(req, res, 498);

    var url     = `https://tric.kr/sign-up/confirm/${email}/${token}`;
    var message = lib.utils.getSignUpEmailMessage (email, url, expire);
    var title   = lib.utils.getSignUpEmailTitle();

    lib.utils.mailto ('popup@naver.com', 'aq175312#$', email, title, message, function (err, info) {
      if(err) console.log (err);
      return lib.response(req, res, 200, {token: token});
    });
  });

  // MAIL
  app.post("/sign-up/avail", function (req, res) {
    let email  = req.body.email;
    if (email == undefined) return lib.response(req, res, 498);

    var ret = lib.mysql.getUserEmail ([email]);
    if(ret.length < 1) return lib.response(req, res, 200);
    return lib.response(req, res, 208);
  });

  app.post("/sign-up/auth", function (req, res) {
    let email  = req.body.email;
    if (email == undefined) return lib.response(req, res, 498);

    var ret = lib.mysql.getUserEmail ([email]);

    if(ret.length > 0) return lib.response(req, res, 208);
    
    lib.mysql.delUserAuthTokenEmail ([email]);

    var expire = moment().tz('Asia/Seoul').add(7, 'd').format('YYYY-MM-DD 23:59:59');
    let token  = lib.utils.generatekey ();
    var ret = lib.mysql.putUserAuthToken ([email, token, expire]);
    if(ret.affectedRows < 1) return lib.response(req, res, 498);

    var url     = `https://tric.kr/sign-up/confirm/${email}/${token}`;
    var message = lib.utils.getSignUpEmailMessage (email, url, expire);
    var title   = lib.utils.getSignUpEmailTitle();

    lib.utils.mailto ('popup@naver.com', 'aq175312#$', email, title, message, function (err, info) {
      if(err) console.log (err);
      return lib.response(req, res, 200);
    });
  });

  app.get("/sign-up/confirm/:email/:token", function (req, res) {
    let email  = req.params.email;
    let token  = req.params.token;

    if (email == undefined || token == undefined) res.send("유효하지 않은 주소입니다");

    var ret = lib.mysql.getUserAuthTokenEmail ([email]);
    if(ret.length < 1) return lib.response(req, res, 404);
    if(ret[0].token != token) res.send("유효하지 않은 주소입니다");
    lib.mysql.delUserAuthTokenEmail ([email]);
    lib.mysql.updUserActivateEmail ([email]);

    return res.send("본인확인이 완료되었습니다");
  });

  app.post("/sign-up/leave", function (req, res) {
    let email  = req.body.email;

    lib.mysql.updUserLeaveEmail ([email]);
    return lib.response(req, res, 200);
  });


/////////////////////////////////////////////////////////////////////////////////////////////////////////////

  app.post('/receipt/list', (req, res) => {
    var email = req.body.email;
    var receipts = null;
    if (email == undefined) return lib.response(req, res, 404);

    if((receipts = lib.mysql.searchReceiptsByEmail ([email])) == null) return lib.response(req, res, 208);
    return lib.response(req, res, 200, { list: receipts });
  });

  app.post('/receipt/list/:from', (req, res) => {
    let email = req.body.email;
    let from  = req.params.from;
    if (email == undefined) return lib.response(req, res, 404);
    if (from == undefined) from = 0;

    var ret = lib.mysql.getUserEmail ([email]);
    if(ret.length < 1) return lib.response(req, res, 208);

    var ret = lib.mysql.getReceiptEmailFrom ([email, from]);
    return lib.response(req, res, 200, { list: ret });
  });

  app.post('/receipt/delete/:id', (req, res) => {
    let id    = req.params.id;
    let email = req.body.email;
    if (email == undefined) return lib.response(req, res, 404);

    var user    = null;
    if((user = lib.mysql.searchUsersByEmail ([email])) == null) return lib.response(req, res, 208);

    lib.mysql.delReceiptById([id]);
    return lib.response(req, res, 200);
  });


  app.post('/coupon/list', function(req, res){
    var email  = req.body.email;
    var lat    = req.body.lat;
    var lng    = req.body.lng;
    if (email == undefined || lat == undefined || lng == undefined) return lib.response(req, res, 404);

    var coupons = lib.mysql.searchUserCouponNearByEmail (email, lat, lng, 500);
    if(coupons.length < 1) return lib.response(req, res, 404);
    for(var i = 0; i < coupons.length; i++) {
      var member = lib.mysql.searchMemberForCouponByRcn ([coupons[i].rcn]);
      coupons[i].distance  = coupons[i].distance * 1000;
      var icon = lib.mysql.searchMemberIcon ([coupons[i].bzcode]);
      coupons[i].icon = icon.icon_path;
      coupons[i].logo = member.logo;
    }
    return lib.response(req, res, 200, {list: coupons});
  });

  app.post('/stamp/list', function(req, res){
    let email  = req.body.email;
    let lat    = req.body.lat;
    let lng    = req.body.lng;
    if (email == undefined || lat == undefined || lng == undefined) return lib.response(req, res, 404);

    var stamps = lib.mysql.searchUserStampByEmail ([email]);
    if(stamps.length < 1) return lib.response(req, res, 208);
    for(var i = 0; i < stamps.length; i++) {
      var member = lib.mysql.searchMemberForCouponByRcn ([stamps[i].rcn]);
      var icon = lib.mysql.searchMemberIcon ([stamps[i].bzcode]);
      stamps[i].icon = icon.icon_path;
      stamps[i].logo = member.logo;
    }
    return lib.response(req, res, 200, {list: stamps});
  });

  app.post('/stamp/delete/:id', function(req, res){
    let id = req.params.id;
    let email = req.body.email;

    var ret = lib.mysql.delUserStampById([id]);
    return lib.response(req, res, 200);
  });

  app.post('/stamp/history/:id', function(req, res){
    let id = req.params.id;
    let email = req.body.email;

    var ret = lib.mysql.getUserStampHistory([id]);
    return lib.response(req, res, 200, {list: ret});
  });

  app.post('/stamp/change/:id', function(req, res){
    var id    = req.params.id;
    var email = req.body.email;

    lib.mysql.chgUsetStampCoupon([id]);
    return lib.response(req, res, 200);
  });


  app.post('/coupon/list/:from', function(req, res){
    let email  = req.body.email;
    let from   = req.params.from;
    if (email == undefined) return lib.response(req, res, 404);

    var ret = lib.mysql.getUserEmail ([email]);
    if(ret.length < 1) return lib.response(req, res, 208);

    var ret = lib.mysql.getCouponEmailFrom([email, from]);
    return lib.response(req, res, 200, { list: ret});
  });

  // DEPRECATED
  app.get('/coupon/:license', function(req, res){
    let license   = req.params.license;
    var ret = lib.mysql.getStoreLicense ([license]);
    if(ret.length < 1) return lib.response(req, res, 404);

    let register = ret[0].register;
    var ret = lib.mysql.getGroupCouponRegister([register]);
    if(ret.length > 0) ret[0].generate = process.env.SERVER + '/publish/coupon/' + register + '/'

    res.contentType("application/json")
    res.send(ret);
  });

  // FCM Callback for Coupon Information
  app.post('/coupon/info/:id', function(req, res) {
    let id    = req.params.id;
    let email = req.body.email;
    var ret = lib.mysql.getMemberCouponId([id]);
    if(ret.length < 1) return lib.response(req, res, 208);
    if(ret.length > 0) ret[0].generate = process.env.SERVER + '/coupon/publish/' + id + '/'

    return lib.response(req, res, 200, { list: ret});
  });

  // Generate User Coupon & Member Coupon Status  Change
  app.post('/coupon/publish/:id', function(req, res) {
    let id    = req.params.id;
    let email = req.body.email;
    var ret = lib.mysql.getMemberCouponId([id]);
    if(lib.mysql.genMemberCouponId(id, email) < 0) return lib.response(req, res, 208);
    return lib.response(req, res, 200);
  });

  app.get('/coupon/find/:rcn/:email/:total', function(req, res) {
    let rcn   = req.params.rcn;
    let email = req.params.email;
    let total = req.params.total;

    var ret = lib.mysql.findCouponRcnEmail (rcn, email, total);
    if(ret.length < 1) return lib.response(req, res, 208);
    return lib.response(req, res, 200, { list: ret});
  });

  app.post('/coupon/find/:rcn', function(req, res) {
    let rcn   = req.params.rcn;
    let email = req.body.email;
    let total = req.body.total;

    var ret = lib.mysql.findCouponRcnEmail (rcn, email, total);
    for (var i = 0; i< ret.length; i++) {
      ret[i].generate = process.env.SERVER + '/coupon/publish/' + ret[i].id + '/';
    }
    if(ret.length < 1) return lib.response(req, res, 208);
    return lib.response(req, res, 200, { list: ret });
  });

  app.post('/receipt/summary', function(req, res){
    let email = req.body.email;
    let data = {};
    let receipts = {};
    let coupons  = {};
    receipts.list = lib.mysql.getReceiptEmail([email]);
    coupons.list = lib.mysql.getCouponEmail([email]);

    receipts.count = receipts.list.length;
    data.receipts = receipts;

    coupons.count = coupons.list.length;
    data.coupons = coupons;
    return lib.response(req, res, 200, {list: ret});
  });

  app.post('/receipt/detail/:id', function(req, res){
    let id = req.params.id;
    let email = req.body.email;

    var ret = lib.mysql.getReceiptIdEmail([id, email]);
    return lib.response(req, res, 200, { list: ret});
  });

  app.post('/receipt/delete/:id', function(req, res){
    let id = req.params.id;
    let email = req.body.email;

    var ret = lib.mysql.delReceiptIdEmail([id, email]);
    return lib.response(req, res, 200);
  });

  app.post('/member/list', function(req, res){
    var email = req.body.email;
    var lat   = req.body.lat;
    var lng   = req.body.lng;
    if (email == undefined || lat == undefined || lng == undefined) return lib.response(req, res, 404);

    var members = lib.mysql.searchMemberNear(lat, lng, 5);
    if(members.length < 1) return lib.response(req, res, 208);

    for(var i = 0; i < members.length; i++) {
      members[i].distance = members[i].distance * 1000;
      var icon = lib.mysql.searchMemberIcon ([members[i].bzname]);
      members[i].icon = (icon != null)? icon.icon_path: "";
    }
    return lib.response(req, res, 200, {list: members});

  });

  app.post('/member/detail/:rcn', function(req, res){
    let email = req.body.email;
    let rcn = req.params.rcn;

    if (email == undefined) return lib.response(req, res, 404);

    var member = lib.mysql.searchMemberDetailByRcn([rcn]);
    if(member.length < 1) return lib.response(req, res, 208);

//    var result = lib.mysql.getAdminMemberInfoRcn([rcn]);
//    if(ret.length < 1) return lib.response(req, res, 200, { list: ret});

//    ret[0].logo = result[0].logo;
//    ret[0].intro = result[0].intro;
//    ret[0].offduty = result[0].offduty;
//    ret[0].opentime = result[0].opentime;
//    ret[0].closetime = result[0].closetime;

    return lib.response(req, res, 200, {list: member});
  });


  app.post('/coupon/delete/:id', function(req, res){
    let id = req.params.id;
    let email = req.body.email;

    var ret = lib.mysql.delUserCouponById([id]);
    return lib.response(req, res, 200);
  });

  app.post('/coupon/detail/:id', function(req, res){
    let id = req.params.id;
    var ret = lib.mysql.getAdminCouponId([id]);
    if(ret.length > 0) ret[0].generate = process.env.SERVER + '/coupon/publish/' + id + '/'
    return lib.response(req, res, 200, { list: ret});
  });

  app.post('/notice/list', function(req, res){
    let email = req.body.email;

    var ret = lib.mysql.getNotice();
    return lib.response(req, res, 200, { list: ret});
  });

  app.post('/notice/list/:from', function(req, res){
    let from  = req.params.from;
    let email = req.body.email;

    var ret = lib.mysql.getNoticeAt([from, from]);
    return lib.response(req, res, 200, { list: ret});
  });

  app.post('/event/list', function(req, res){
    let email = req.body.email;

    var ret = lib.mysql.getEvent();
    return lib.response(req, res, 200, { list: ret});
  });

  app.post('/event/list/:from', function(req, res){
    let from  = req.params.from;
    let email = req.body.email;

    var ret = lib.mysql.getEventAt([from, from]);
    return lib.response(req, res, 200, { list: ret});
  });

  app.post('/banner/main/list', function(req, res){
    let email = req.body.email;

    var ret = lib.mysql.getAdminMainBanner();
    return lib.response(req, res, 200, { list: ret});
  });

  app.post('/banner/event/list', function(req, res){
    let email = req.body.email;

    var ret = lib.mysql.getAdminEventBanner();
    return lib.response(req, res, 200, { list: ret});
  });

  app.post('/statistics/receipt', function(req, res){
    let email = req.body.email;

    var ret = lib.mysql.getReceiptSatisticsEmail(email);
    return lib.response(req, res, 200, { list: ret});
  });

  app.get('/ws/:message', function(req, res){
    let message = req.params.message;
    router.websocket.wsendAll(message);
    return res.send('ok');
  });
  app.get('/ws/:license/:message', function(req, res){
    let message = req.params.message;
    let license = req.params.license;
    router.websocket.wsend(license, message);
    return res.send('ok');
  });

  app.get('/alert/coupon/:cpcode', function(req, res){
    let cpcode = req.params.cpcode;
    var ret = lib.mysql.getUserCouponCode ([cpcode]);
    if(ret.length < 1) return  lib.response(req, res, 404);

    let qrCode = require('qrcode')
    qrCode.toDataURL(cpcode, function (err, data) {
      ret[0].QR = data;
      ret[0].registered = moment(ret[0].registered).format("YYYY-MM-DD HH:mm:ss");
      //ret[0].notice = ret[0].notice.replace("\n","</br>");
      ret[0].date2 = moment(ret[0].date2).format("YYYY-MM-DD");
      return res.render("coupon", {list: ret[0]});
    })
  });

  app.get('/use/coupon/:cpcode', function(req, res){
    let cpcode = req.params.cpcode;
    var ret = lib.mysql.getUserCouponCode ([cpcode]);
    if(ret.length < 1) return  lib.response(req, res, 404);

    var ret = lib.mysql.updUserCouponUsedCode ([cpcode]);
    if(ret.affectedRows < 1) return res.json({'message': '쿠폰 사용이 불가합니다.'});
    return res.json({'message': '쿠폰이 정상적으로 사용되었습니다.'});
  });

  app.post('/pos/current/version', function(req, res) {
    let Rcn    = req.body.Rcn;
    let Mac    = req.body.Mac;
    if(Rcn == undefined || Mac == undefined) return lib.response(req, res, 404);

    var ret = lib.mysql.getPosMacRcn ([Mac, Rcn]);
    if(ret.length < 1) return lib.response(req, res, 404);

    return res.json({code: 200, license: ret[0].license});
  });

  app.post('/pos/sign-in/', function(req, res) {
    let Rcn    = req.body.Rcn;
    let Mac    = req.body.Mac;
    if(Rcn == undefined || Mac == undefined) return lib.response(req, res, 404);

    var ret = lib.mysql.getPosMacRcn ([Mac, Rcn]);
    if(ret.length < 1) return lib.response(req, res, 404);

    lib.mysql.updPosHbeat ([moment().format("YYYY-MM-DD HH:mm:ss"), ret[0].license]);
    return res.json({code: 200, license: ret[0].license});
  });

  app.post('/pos/sign-up/', function(req, res) {
    let Email  = req.body.Email;
    let Rcn    = req.body.Rcn;
    let Mac    = req.body.Mac;

    if(Email == undefined || Rcn == undefined || Mac == undefined) return lib.response(req, res, 404);

    var ret = lib.mysql.getPosEmailMacRcn ([Email, Mac, Rcn]);
    if(ret.length > 0) return lib.response(req, res, 208);

    var Expire = moment().tz('Asia/Seoul').add(7, 'd').format('YYYY-MM-DD 23:59:59');
    let Token  = lib.utils.generatekey ();

    var ret = lib.mysql.putPos([Email, Mac, Rcn, Token, Expire]);
    if(ret.affectedRows < 1) return lib.response(req, res, 409);

    var url     = `https://tric.kr/pos/sign-up/confirm/${Email}/${Token}`;
    var message = lib.utils.getSignUpEmailMessage (Email, url, Expire);
    var title   = lib.utils.getSignUpEmailTitle();

    lib.utils.mailto ('popup@naver.com', 'aq175312#$', Email, title, message, function (err, info) {
      if(err) console.log (err);
      return lib.response(req, res, 200);
    });
  });

  app.get("/pos/sign-up/confirm/:Email/:Token", function (req, res) {
    let Email  = req.params.Email;
    let Token  = req.params.Token;

    if (Email == undefined || Token == undefined) res.send("유효하지 않은 주소입니다");

    var ret = lib.mysql.getPosEmailToken ([Email, Token]);
    if(ret.length < 1) return lib.response(req, res, 404);

    let license  = lib.utils.generatekey ('digits', 6);
    lib.mysql.updPosActivateEmailToken ([license, Email, Token]);
    return res.send("본인확인이 완료되었습니다");
  });

  app.get('/pos/sign-up/:Mac', function(req, res) {
    let Mac    = req.params.Mac;
    return res.render("pos-sign-up", { Mac: Mac });
  });

  app.get('/pos/registered/:License', function(req, res) {
    let License    = req.params.License;

    var ret = lib.mysql.getPosLicense ([License]);
    if(ret.length < 1) return lib.response(req, res, 404);

    ret[0].registered = moment(ret[0].date2).format("YYYY-MM-DD HH:mm:ss");
    return res.render("pos-registered", { list: ret[0] });
  });

  app.get('/pos/pairing/:License', function(req, res){
    let License    = req.params.License;

    var ret = lib.mysql.getPosLicense ([License]);
    if(ret.length < 1) return lib.response(req, res, 404);

    let URL = process.env.SERVER + "/qrscan/" + License;

    let qrCode = require('qrcode')
    qrCode.toDataURL(URL, function (err, data) {
      ret[0].URL = URL;
      ret[0].QR  = data;
      ret[0].registered = moment(ret[0].registered).format("YYYY-MM-DD HH:mm:ss");
      ret[0].date2 = moment(ret[0].date2).format("YYYY-MM-DD");
      return res.render("pos-pairing", {list: ret[0]});
    })
  });


  app.post('/mac/:mac', function(req, res){
    let mac = req.body.Mac;

    var ret = lib.mysql.getLicense ([mac]);
    if(ret.length < 1) return res.json ({code: 404});
    return res.json({code: 200, license: ret[0].license});
  });

}
