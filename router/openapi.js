'use strict';

const moment  = require('moment-timezone');
const lib = require('../lib');

module.exports = function(app) {

  // SIGN-IN
  app.post("/sign-in", function (req, res) {
    let email  = (req.body.id != undefined)? req.body.id: req.body.email;
    let passwd = (req.body.pwd!= undefined)? req.body.pwd: reg.body.passwd;
    let fcmkey = req.body.key;

    if (email == undefined || passwd == undefined || fcmkey == undefined) return lib.response(req, res, 404);

    var ret = lib.mysql.getUserEmailPass ([email, passwd]);
    if(ret.length < 1) return lib.response(req, res, 400);
    if(ret[0].activated != "Y") return lib.response(req, res, 203);
    console.log(ret[0]);
    console.log(ret[0].activated);

    var ret = lib.mysql.updUser([fcmkey, email]);
    if(ret.affectedRows > 0) return lib.response(req, res, 200);

    return lib.response(req, res, 409);
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

  // SIGN-UP
  app.post('/sign-up/', function(req, res) {
    let email  = (req.body.id != undefined)? req.body.id: req.body.email;
    let passwd = (req.body.pwd!= undefined)? req.body.pwd: reg.body.passwd;
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
      return lib.response(req, res, 200);
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






  // DEPLICATED
  app.get('/receipt', (req, res) => {
    var ret = lib.mysql.getReceipt();
    return lib.response(req, res, 200, { data: JSON.stringify(ret)});
  });

  // DEPLICATED
  app.get('/receipt/:email', (req, res) => {
    let email = req.params.email;
    if (email == undefined) return lib.response(req, res, 404);

    var ret = lib.mysql.getUserEmail ([email]);
    if(ret.length < 1) return lib.response(req, res, 208);

    var ret = lib.mysql.getReceiptEmail([email]);
    res.contentType("application/json")
    res.send( JSON.stringify(ret) );
    //return lib.response(req, res, 200, { data: JSON.stringify(ret)});
  });

  app.post('/receipt/list/:from', (req, res) => {
    let email = req.body.email;
    let from  = req.params.from;
    if (email == undefined) return lib.response(req, res, 404);
    if (from == undefined) from = 0;

    var ret = lib.mysql.getUserEmail ([email]);
    if(ret.length < 1) return lib.response(req, res, 208);

    console.log ('frrom: ',typeof from);
    var ret = lib.mysql.getReceiptEmailFrom ([email, from]);
    return lib.response(req, res, 200, { data: JSON.stringify(ret)});
  });

  app.post('/receipt/list', (req, res) => {
    let email = req.body.email;
    if (email == undefined) return lib.response(req, res, 404);

    var ret = lib.mysql.getUserEmail ([email]);
    if(ret.length < 1) return lib.response(req, res, 208);

    var ret = lib.mysql.getReceiptEmail([email]);
    return lib.response(req, res, 200, { data: JSON.stringify(ret)});
  });

  // DEPLICATED
  app.get('/coupon', function(req, res){
    let ret = lib.mysql.getCoupon([]);

    res.contentType("application/json")
    res.send(JSON.stringify(ret));
  });

  // DEPLICATED
  app.get('/coupon/:email', function(req, res){
    let email   = req.params.email;
    let ret = lib.mysql.getCouponEmail([email]);

    res.contentType("application/json")
    res.send(JSON.stringify(ret));
  });

  app.post('/coupon/list/:from', function(req, res){
    let email  = req.body.email;
    let from   = req.params.from;
    if (email == undefined) return lib.response(req, res, 404);

    var ret = lib.mysql.getUserEmail ([email]);
    if(ret.length < 1) return lib.response(req, res, 208);

    var ret = lib.mysql.getCouponEmailFrom([email, from]);
    return lib.response(req, res, 200, { data: JSON.stringify(ret)});
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
    res.send(JSON.stringify(ret));
  });

  // FCM Callback for Coupon Information
  app.get('/coupon/info/:id', function(req, res) {
    let id    = req.params.id;
    let email = req.body.email;
    var ret = lib.mysql.getMemberCouponId([id]);
    if(ret.length < 1) return lib.response(req, res, 208);
    if(ret.length > 0) ret[0].generate = process.env.SERVER + '/coupon/publish/' + id + '/'

    return lib.response(req, res, 200, { data: JSON.stringify(ret)});
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
    return lib.response(req, res, 200, { data: JSON.stringify(ret)});
  });

  app.post('/coupon/find', function(req, res) {
    let rcn   = req.body.rcn;
    let email = req.body.email;
    let total = req.body.total;

    var ret = lib.mysql.findCouponRcnEmail (rcn, email, total);
    if(ret.length < 1) return lib.response(req, res, 208);
    return lib.response(req, res, 200, { data: JSON.stringify(ret)});
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
    return lib.response(req, res, 200, { data: JSON.stringify(data)});
  });

  app.post('/receipt/detail/:id', function(req, res){
    let id = req.params.id;
    let email = req.body.email;

    var ret = lib.mysql.getReceiptIdEmail([id, email]);
    return lib.response(req, res, 200, { data: JSON.stringify(ret)});
  });

  app.post('/receipt/delete/:id', function(req, res){
    let id = req.params.id;
    let email = req.body.email;

    var ret = lib.mysql.delReceiptIdEmail([id, email]);
    return lib.response(req, res, 200);
  });

  app.post('/member/near', function(req, res){
    let email = req.body.email;
    let lat = req.body.lat;
    let lng = req.body.lng;

    var ret = lib.mysql.getAdminMemberNear(lat, lng);
    return lib.response(req, res, 200, { data: JSON.stringify(ret)});
  });

  app.post('/coupon/delete/:id', function(req, res){
    let id = req.params.id;
    let email = req.body.email;

    var ret = lib.mysql.delCouponIdEmail([id, email]);
    return lib.response(req, res, 200);
  });

  app.post('/coupon/detail/:id', function(req, res){
    let id = req.params.id;
    let email = req.body.email;

    var ret = lib.mysql.getCouponIdEmail([id, email]);
    return lib.response(req, res, 200, { data: JSON.stringify(ret)});
  });

  app.post('/notice/list', function(req, res){
    let email = req.body.email;

    var ret = lib.mysql.getNotice();
    return lib.response(req, res, 200, { data: JSON.stringify(ret)});
  });

  app.post('/notice/list/:from', function(req, res){
    let from  = req.params.from;
    let email = req.body.email;

    var ret = lib.mysql.getNoticeAt([from, from]);
    return lib.response(req, res, 200, { data: JSON.stringify(ret)});
  });

  app.post('/event/list', function(req, res){
    let email = req.body.email;

    var ret = lib.mysql.getEvent();
    return lib.response(req, res, 200, { data: JSON.stringify(ret)});
  });

  app.post('/event/list/:from', function(req, res){
    let from  = req.params.from;
    let email = req.body.email;

    var ret = lib.mysql.getEventAt([from, from]);
    return lib.response(req, res, 200, { data: JSON.stringify(ret)});
  });

}
