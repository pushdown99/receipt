'use strict';

module.exports = function (app) {
  let dotenv  = require('dotenv').config({ path: require('find-config')('.env') })
  let lib     = require('../lib');
  let router  = require('.');
  let verbose = true;

  app.get('/json/rcn-check/:rcn', function (req, res) {
    var rcn = req.params.rcn;
    var obj = {};
    console.log (rcn);
    lib.utils.postCRN(rcn).catch(err => console.log('err', err)).then(function (result) {
      res.json(result);
    });
  });

  /////////////////////////////////////////////////////
  app.post('/json/user/search', function (req, res) {
    var rcn   = (req.params.rcn =="all")? '%%':'%'+req.params.rcn+'%';
    var stat  = (req.params.stat=="all")? '%%':'%'+req.params.stat+'%';
    var area1 = (req.params.area1=="all")? '%%':'%'+req.params.area1+'%';
    var area2 = (req.params.area2=="all")? '%%':'%'+req.params.area2+'%';
    var date1 = req.params.date1;
    var date2 = req.params.date2;

    var result = lib.mysql.getAdminMember([rcn, stat, area1, area2, date1, date2]);
    res.json(result);
  });

  app.post('/json/user/join/search', function (req, res) {
    var date1 = req.params.date1;
    var date2 = req.params.date2;

    var result = lib.mysql.getAdminMember([rcn, stat, area1, area2, date1, date2]);
    res.json(result);
  });
  app.post('/json/admin/profile/update', function (req, res) {
    name  = req.body.name;
    mobile = req.body.mobile;
    phone  = req.body.phone;

    var result = lib.mysql.updAdminUser ([name, mobile, phone]);
    res.join (result);
  });

  app.get('/json/member/search/:rcn/:stat/:area1/:area2/:date1/:date2', function (req, res) {
    var rcn   = (req.params.rcn =="all")?   '%%':'%'+req.params.rcn+'%';
    var stat  = (req.params.stat=="all")?   '%%':'%'+req.params.stat+'%';
    var age   = (req.params.gender=="all")? '%%':'%'+req.params.stat+'%';
    var gender= (req.params.gender=="all")? '%%':'%'+req.params.stat+'%';
    var area1 = (req.params.area1=="all")?  '%%':'%'+req.params.area1+'%';
    var area2 = (req.params.area2=="all")?  '%%':'%'+req.params.area2+'%';
    var date1 = req.params.date1;
    var date2 = req.params.date2;

    var result = lib.mysql.getAdminMember([rcn, stat, area1, area2, date1, date2]);
    res.json(result);
  });

  app.post('/json/member/search', function (req, res) {
    var rcn   = (req.body.rcn =="all")? '%%':'%'+req.body.rcn+'%';
    var stat  = (req.body.stat=="all")? '%%':'%'+req.body.stat+'%';
    var area1 = (req.body.area1=="all")? '%%':'%'+req.body.area1+'%';
    var area2 = (req.body.area2=="all")? '%%':'%'+req.body.area2+'%';
    var date1 = req.body.date1;
    var date2 = req.body.date2;

    var result = lib.mysql.getAdminMember([rcn, rcn, stat, area1, area2, date1, date2]);
    res.json(result);
  });

 app.get('/json/coupon/search/:rcn/:stat/:area1/:area2/:date1/:date2', function (req, res) {
    var rcn   = (req.params.rcn =="all")? '%%':'%'+req.params.rcn+'%';
    var stat  = (req.params.stat=="all")? '%%':'%'+req.params.stat+'%';
    var area1 = (req.params.area1=="all")? '%%':'%'+req.params.area1+'%';
    var area2 = (req.params.area2=="all")? '%%':'%'+req.params.area2+'%';
    var date1 = req.params.date1;
    var date2 = req.params.date2;

    var result = lib.mysql.getAdminMember([rcn, stat, area1, area2, date1, date2]);
    res.json(result);
  });

  app.post('/json/coupon/search', function (req, res) {
    var name  = (req.body.name =="all")? '%%':'%'+req.body.name+'%';
    var stat  = (req.body.stat=="all")? '%%':'%'+req.body.stat+'%';
    var date1 = req.body.date1;
    var date2 = req.body.date2;

    var result = lib.mysql.getAdminCoupon([name, stat, date1, date2]);
    res.json(result);
  });

  app.post('/json/admin/member/register', function (req, res) {
    var rcn    = req.body.rcn;
    var passwd = req.body.password1;
    var name   = req.body.name;
    var owner  = req.body.owner;
    var bzcond = req.body.bzcond;
    var bztype = req.body.bztype;
    var bzname = req.body.bzname;
    var phone  = req.body.phone;
    var date1  = req.body.date1;
    var area1  = req.body.area1;
    var area2  = req.body.area2;
    var addr   = req.body.addr;
    var lat    = req.body.lat;
    var lng    = req.body.lng;

    var result = lib.mysql.putAdminMemberLogo([rcn, name, '/rc/images/logo_store_default']);
    var result = lib.mysql.putAdminMemberInfo([rcn, 'https://tric.kr/rc/images/img_store_leaflet', '많은이용바랍니다']);
    var result = lib.mysql.putAdminMember([rcn, passwd, name, owner, bzcond, bztype, bzname, phone, date1, area1, area2, addr, lat, lng]);
    res.json(result);
  });

  app.post('/json/admin/search', function (req, res) {
    var name  = (req.body.name =="all")? '%%':'%'+req.body.name+'%';
    var stat  = (req.body.stat=="all")? '%%':'%'+req.body.stat+'%';
    var grade = (req.body.grade=="all")? '%%':'%'+req.body.grade+'%';
    var date1 = req.body.date1;
    var date2 = req.body.date2;

    var result = lib.mysql.getAdminAdmin([name, grade, stat, date1, date2]);
    res.json(result);
  });

  app.post('/json/notice/search', function (req, res) {
    var title  = (req.body.title =="all")? '%%':'%'+req.body.title+'%';
    var gender = (req.body.gender=="all")? '%%':'%'+req.body.gender+'%';
    var age = (req.body.age=="all")? '%%':'%'+'%'+req.body.age+'%';
    var area1 = (req.body.area1=="all")? '%%':'%'+req.body.area1+'%';
    var area2 = (req.body.area2=="all")? '%%':'%'+req.body.area2+'%';
    var date1 = req.body.date1;
    var date2 = req.body.date2;

    var result = lib.mysql.getAdminNotice([title, gender, age, area1, area2, date1, date2]);
    res.json(result);
  });

  app.post('/json/class/search', function (req, res) {
    var name  = (req.body.bizname =="all")? '%%':'%'+req.body.bizname+'%';
    var date1 = req.body.date1;
    var date2 = req.body.date2;

    var result = lib.mysql.getAdminClass([name, date1, date2]);
    res.json(result);
  });

  app.post('/json/group/search', function (req, res) {
    var name  = (req.body.name =="all")? '%%':'%'+req.body.name+'%';
    var date1 = req.body.date1;
    var date2 = req.body.date2;

    var result = lib.mysql.getAdminGroup([name, date1, date2]);
    res.json(result);
  });

  app.get('/json/city/search', function (req, res) {
    var result = lib.mysql.getCityArea1 ();
    res.json(result);
  });

  app.get('/json/city/search/:area1', function (req, res) {
    var area1 = (req.params.name =="all")? '%%':'%'+req.params.area1+'%';
    var result = lib.mysql.getCityArea2 ([area1]);
    res.json(result);
  });

  app.get('/json/admin/member/search', function (req, res) {
    var result = lib.mysql.getMemberAll ();
    res.json(result);
  });

  app.get('/json/admin/member/search/rcn/:rcn', function (req, res) {
    var rcn = req.params.rcn;

    var result = lib.mysql.getAdminMemberRcn ([rcn]);
    res.json(result[0]);
  });

  app.get('/json/member/dashboard/:type/:date1/:date2', function (req, res) {
    var type  = req.params.type;
    var date1 = req.params.date1;
    var date2 = req.params.date2;
    var result = "";

    switch (type) {
    case "일별": result = lib.mysql.getDashboardDay  ([date1, date2]); break;
    case "주별": result = lib.mysql.getDashboardWeek ([date1, date2]); break;
    case "월별": result = lib.mysql.getDashboardMon  ([date1, date2]); break;
    } 
    res.json(result);
  });

  app.post("/json/geocode/", function (req, res) {
    var addr    = req.body.addr;
    lib.google.getGeocode(addr).catch(err => console.log(err)).then(result => {
      console.log (result);
      console.log (result[0].latitude, result[0].latitude);
      res.json ({addr: addr, lat: result[0].latitude, lng: result[0].longitude, formattedAddress: result[0].formattedAddress});
    });
  });

  app.get("/json/bzname/search", function (req, res) {
    var result = lib.mysql.getBzname ();
    res.json(result);
  });

  app.post('/json/admin/class/register', function (req, res) {
    var name  = req.body.name;
    var icon  = req.body.icon;

    let File1, File2, File3, uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
      res.status(400).send('No files were uploaded.');
      return;
    }
    console.log('req.files >>>', req.files); // eslint-disable-line

    File1 = req.files.file1;
    uploadPath = __dirname + '/../uploads/' + `${icon}.png`;
    File1.mv(uploadPath, function(err) {
      if (err) { return res.status(500).send(err); }
    });

    File2 = req.files.file2;
    uploadPath = __dirname + '/../uploads/' + `${icon}@2x.png`;
    File2.mv(uploadPath, function(err) {
      if (err) { return res.status(500).send(err); }
    });

    File3 = req.files.file3;
    uploadPath = __dirname + '/../uploads/' + `${icon}@3x.png`;
    File3.mv(uploadPath, function(err) {
      if (err) { return res.status(500).send(err); }
    });
    res.json({});
  });

  app.get('/json/admin/member/coupon/checkup/:cpcode', function (req, res) {
    var cpcode  = req.params.cpcode;

    var result = lib.mysql.getAdminCouponCpcode ([cpcode]);
    res.json (result);
  });

  app.post('/json/admin/coupon/register', function (req, res) {
    var member  = req.body.member1;
    var rcn     = req.body.member1_rcn;
    var bzcode  = req.body.member1_bzcode;
    var cpcode  = req.body.cpcode;
    var name    = req.body.cpname;
    var date1   = req.body.date2;
    var date2   = req.body.date2;
    var status  = req.body.status;
    var benefit = req.body.benefit;
    var notice  = req.body.notice;

    var result = lib.mysql.putAdminCoupon ([member, rcn, bzcode, "프로모션", cpcode, 'Y', name, 0, 0, date1, date2, status, benefit, notice]);
    res.json (result);

  });

  app.get('/json/admin/email-check/:email', function (req, res) {
    var email  = req.params.email;

    var result = lib.mysql.getAdminAdminEmail (email);
    res.json (result);
  });

  app.post('/json/admin/admin/register', function (req, res) {
    var email    = req.body.email;
    var password = req.body.password;
    var name     = req.body.name;
    var mobile   = req.body.mobile;
    var phone    = req.body.phone;
    var role     = req.body.role;
    var status   = req.body.status;

    var result = lib.mysql.putAdminAdmin ([email, password, name, mobile, phone, role, status]);
    res.json (result);

  });

  app.post('/json/admin/event/search', function (req, res) {
    var coupon = (req.body.coupon == "all")? "%%": req.body.coupon;
    var status = (req.body.status == "all")? "%%": req.body.status;
    var date1  = req.body.date1;
    var date2  = req.body.date2;

    var result = lib.mysql.getAdminEventAll ([coupon, status, date1, date2]);
    res.json (result);

  });


}
