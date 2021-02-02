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

  ///////////////////////////////////////////////////////////////////////////////////////////////
  //
  // REGISTER
  //

  /////////////////////////////////////////////////////////////////////////
  // ADMIN-MEMBER-REGISTER
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

  /////////////////////////////////////////////////////////////////////////
  // ADMIN-COUPON-REGISTER
  app.post('/json/admin/coupon/register', function (req, res) {
    var member  = req.body.member1;
    var rcn     = req.body.member1_rcn;
    var bzcode  = req.body.member1_bzcode;
    var cpcode  = req.body.cpcode;
    var name    = req.body.cpname;
    var date1   = req.body.date1;
    var date2   = req.body.date2;
    var status  = req.body.status;
    var benefit = req.body.benefit;
    var notice  = req.body.notice;

    var result = lib.mysql.putAdminCoupon ([member, rcn, bzcode, "프로모션", cpcode, 'Y', name, 0, 0, date1, date2, status, benefit, notice]);
    res.json (result);
  });

  /////////////////////////////////////////////////////////////////////////
  // ADMIN-EVENT-REGISTER
  app.post('/json/admin/event/register', function (req, res) {
    var title   = req.body.title;
    var status  = req.body.status;
    var fweight = req.body.fweight;
    var fnotice = req.body.fnotice;
    var fmain   = req.body.fmain;
    var fevent  = req.body.fevent;
    var gender  = req.body.gender;
    var age     = req.body.age;
    var area1   = req.body.area1;
    var area2   = req.body.area2;
    var date1   = req.body.date1;
    var date2   = req.body.date2;
    var prefix1 = req.body.prefix1;
    var prefix2 = req.body.prefix2;
    var prefix3 = req.body.prefix3;
    var rgb1    = req.body.rgb1;
    var rgb2    = req.body.rgb2;
    var coupon  = req.body.coupon;
    var date3   = req.body.date3;
    var date4   = req.body.date4;

    var title  = req.body.title;
    var gender  = req.body.gender;
    var age  = req.body.age;
    var area1  = req.body.area1;
    var area2  = req.body.area2;
    var date1  = req.body.date1;
    var date2  = req.body.date2;
    var notice  = req.body.notice;
    var prefix1  = req.body.prefix1;

    var file1, file2, file3, file4, file5, file6, file7, file8, file9, uploadPath;
    var path1, path2, path3, path4, path5, path6, path7, path8, path9;

    if (!req.files || Object.keys(req.files).length === 0) {
      res.status(400).send('No files were uploaded.');
      return;
    }
    console.log('req.files >>>', req.files); // eslint-disable-line

    file1 = req.files.file1;
    uploadPath = __dirname + '/../rc/banner/' + `${prefix1}.png`;
    path1 = `${prefix1}.png`;
    file1.mv(uploadPath, function(err) {
      if (err) { return res.status(500).send(err); }
    });

    file2 = req.files.file2;
    uploadPath = __dirname + '/../rc/banner/' + `${prefix1}@2x.png`;
    path2 = `${prefix1}@2x.png`;
    file2.mv(uploadPath, function(err) {
      if (err) { return res.status(500).send(err); }
    });

    file3 = req.files.file3;
    uploadPath = __dirname + '/../rc/banner/' + `${prefix1}@3x.png`;
    path3 = `${prefix1}@3x.png`;
    file3.mv(uploadPath, function(err) {
      if (err) { return res.status(500).send(err); }
    });

    file4 = req.files.file1;
    uploadPath = __dirname + '/../rc/banner/' + `${prefix2}.png`;
    path4 = `${prefix2}.png`;
    file4.mv(uploadPath, function(err) {
      if (err) { return res.status(500).send(err); }
    });

    file5 = req.files.file2;
    uploadPath = __dirname + '/../rc/banner/' + `${prefix2}@2x.png`;
    path5 = `${prefix2}@2x.png`;
    file5.mv(uploadPath, function(err) {
      if (err) { return res.status(500).send(err); }
    });

    file6 = req.files.file3;
    uploadPath = __dirname + '/../rc/banner/' + `${prefix2}@3x.png`;
    path6 = `${prefix2}@3x.png`;
    file6.mv(uploadPath, function(err) {
      if (err) { return res.status(500).send(err); }
    });

    file7 = req.files.file7;
    uploadPath = __dirname + '/../rc/banner/' + `${prefix3}.png`;
    path7 = `${prefix3}.png`;
    file7.mv(uploadPath, function(err) {
      if (err) { return res.status(500).send(err); }
    });

    file8 = req.files.file8;
    uploadPath = __dirname + '/../rc/banner/' + `${prefix3}@2x.png`;
    path8 = `${prefix3}@2x.png`;
    file8.mv(uploadPath, function(err) {
      if (err) { return res.status(500).send(err); }
    });

    file9 = req.files.file9;
    uploadPath = __dirname + '/../rc/banner/' + `${prefix3}@3x.png`;
    path9 = `${prefix3}@3x.png`;
    file9.mv(uploadPath, function(err) {
      if (err) { return res.status(500).send(err); }
    });

    prefix1 = process.env.SERVER + "/rc/banner/" + prefix1;
    prefix2 = process.env.SERVER + "/rc/banner/" + prefix2;
    prefix3 = process.env.SERVER + "/rc/banner/" + prefix3;

    var result = lib.mysql.putAdminEvent ([title, status, fnotice, fweight, fmain, fevent, gender, age, area1, area2, date1, date2, prefix1, prefix2, prefix3, rgb1, rgb2, coupon, date3, date4, ""]);
    res.json(result[0]);
  });

  /////////////////////////////////////////////////////////////////////////
  // ADMIN-NOTICE-REGISTER
  app.post('/json/admin/notice/register', function (req, res) {
    var title    = req.body.title;
    var gender   = req.body.gender;
    var age      = req.body.age;
    var area1    = req.body.area1;
    var area2    = req.body.area2;
    var date1    = req.body.date1;
    var date2    = req.body.date2;
    var notice   = req.body.notice;
    var prefix1  = req.body.prefix1;

    var file1, file2, file3, uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
      res.status(400).send('No files were uploaded.');
      return;
    }
    console.log('req.files >>>', req.files); // eslint-disable-line

    file1 = req.files.file1;
    uploadPath = __dirname + '/../public/rc/banner/' + `${prefix1}.png`;
    file1.mv(uploadPath, function(err) {
      if (err) { return res.status(500).send(err); }
    });

    file2 = req.files.file2;
    uploadPath = __dirname + '/../public/rc/banner/' + `${prefix1}@2x.png`;
    file2.mv(uploadPath, function(err) {
      if (err) { return res.status(500).send(err); }
    });

    file3 = req.files.file3;
    uploadPath = __dirname + '/../public/rc/banner/' + `${prefix1}@3x.png`;
    file3.mv(uploadPath, function(err) {
      if (err) { return res.status(500).send(err); }
    });

    prefix1 = process.env.SERVER + "/rc/banner/" + prefix1;
    var result = lib.mysql.putAdminNotice ([title, gender, age, area1, area2, date1, date2, notice, prefix1]);
    res.json(result[0]);
  });

  /////////////////////////////////////////////////////////////////////////
  // ADMIN-ADMIN-REGISTER
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

  /////////////////////////////////////////////////////////////////////////
  // ADMIN-CLASS-REGISTER
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
    uploadPath = __dirname + '/../rc/images/' + `${icon}.png`;
    File1.mv(uploadPath, function(err) {
      if (err) { return res.status(500).send(err); }
    });

    File2 = req.files.file2;
    uploadPath = __dirname + '/../rc/images/' + `${icon}@2x.png`;
    File2.mv(uploadPath, function(err) {
      if (err) { return res.status(500).send(err); }
    });

    File3 = req.files.file3;
    uploadPath = __dirname + '/../rc/images/' + `${icon}@3x.png`;
    File3.mv(uploadPath, function(err) {
      if (err) { return res.status(500).send(err); }
    });
    res.json({});
  });

  ///////////////////////////////////////////////////////////////////////////////////////////////
  //
  // SEARCH
  //

  /////////////////////////////////////////////////////////////////////////
  // ADMIN-MEMBER-SEARCH
  app.post('/json/admin/member/search', function (req, res) {
    var rcn   = (req.body.rcn =="all")? '%%':'%'+req.body.rcn+'%';
    var stat  = (req.body.stat=="all")? '%%':'%'+req.body.stat+'%';
    var area1 = (req.body.area1=="all")? '%%':'%'+req.body.area1+'%';
    var area2 = (req.body.area2=="all")? '%%':'%'+req.body.area2+'%';
    var date1 = req.body.date1;
    var date2 = req.body.date2;

    var result = lib.mysql.searchAdminMember([rcn, rcn, stat, area1, area2, date1, date2]);
    res.json(result);
  });


  app.get('/json/admin/member/search/all', function (req, res) {
    var result = lib.mysql.getAdminMemberAll([]);
    res.json(result);
  });

  app.get('/json/admin/member/search/id/:id', function (req, res) {
    var id = req.params.id;
    var result = lib.mysql.findAdminMemberId ([id]);
    res.json (result);
  });

  /////////////////////////////////////////////////////////////////////////
  // ADMIN-USER-SEARCH
  app.post('/json/admin/user/search', function (req, res) {
    var email = (req.body.email =="all")? '%%':'%'+req.body.email+'%';
    var os    = (req.body.os=="all")? '%%':'%'+req.body.os+'%';
    var age = (req.body.age=="all")? '%%':req.body.age;
    var gender = (req.body.gender=="all")? '%%':'%'+req.body.gender+'%';
    var area1 = (req.body.area1=="all")? '%%':'%'+req.body.area1+'%';
    var area2 = (req.body.area2=="all")? '%%':'%'+req.body.area2+'%';
    var date1 = req.body.date1;
    var date2 = req.body.date2;

    var result = lib.mysql.searchAdminUser([email, os, gender, age, area1, area2, date1, date2]);
    res.json(result);
  });

  app.post('/json/admin/user/search/deal', function (req, res) {
    var email = req.body.email;
    var rcn   = (req.body.rcn=="")? '%%':'%'+req.body.rcn+'%';
    var date1 = req.body.date1;
    var date2 = req.body.date2;

    var result = lib.mysql.searchAdminUserReceipt([rcn, rcn, date1, date2, email]);
    res.json(result);
  });

  app.post('/json/admin/user/search/coupon', function (req, res) {
    var email = req.body.email;
    var rcn   = (req.body.rcn=="")? '%%':'%'+req.body.rcn+'%';
    var date1 = req.body.date1;
    var date2 = req.body.date2;

    var result = lib.mysql.searchAdminUserCoupon([rcn, rcn, date1, date2, email]);
    res.json(result);
  });

  app.post('/json/admin/user/search/stamp', function (req, res) {
    var email = req.body.email;
    var rcn   = (req.body.rcn=="")? '%%':'%'+req.body.rcn+'%';
    var date1 = req.body.date1;
    var date2 = req.body.date2;

    var result = lib.mysql.searchAdminUserStamp([rcn, rcn, date1, date2, email]);
    res.json(result);
  });

  app.get('/json/admin/user/search/id/:id', function (req, res) {
    var id = req.params.id;
    var result = lib.mysql.findAdminUserId ([id]);
    res.json (result);
  });

  /////////////////////////////////////////////////////////////////////////
  // ADMIN-COUPON-SEARCH
  app.post('/json/admin/coupon/search', function (req, res) {
    var name  = (req.body.name =="all")? '%%':'%'+req.body.name+'%';
    var stat  = (req.body.stat=="all")? '%%':'%'+req.body.stat+'%';
    var date1 = req.body.date1;
    var date2 = req.body.date2;

    var result = lib.mysql.searchAdminCoupon([name, stat, date1, date2]);
    res.json(result);
  });

  app.get('/json/admin/coupon/search/id/:id', function (req, res) {
console.log("called");
    var id = req.params.id;
    var result = lib.mysql.findAdminCouponId ([id]);
    res.json (result);
  });

  /////////////////////////////////////////////////////////////////////////
  // ADMIN-EVENT-SEARCH
  app.post('/json/admin/event/search', function (req, res) {
    var coupon = (req.body.coupon == "all")? "%%": req.body.coupon;
    var status = (req.body.status == "all")? "%%": req.body.status;
    var date1  = req.body.date1;
    var date2  = req.body.date2;

    var result = lib.mysql.searchAdminEvent ([coupon, status, date1, date2]);
    res.json (result);
  });

  app.get('/json/admin/event/search/id/:id', function (req, res) {
    var id = req.params.id;
    var result = lib.mysql.findAdminEventId ([id]);
    res.json (result);
  });

  /////////////////////////////////////////////////////////////////////////
  // ADMIN-NOTICE-SEARCH
  app.post('/json/admin/notice/search', function (req, res) {
    var title  = (req.body.title =="all")? '%%':'%'+req.body.title+'%';
    var gender = (req.body.gender=="all")? '%%':'%'+req.body.gender+'%';
    var age = (req.body.age=="all")? '%%':'%'+'%'+req.body.age+'%';
    var area1 = (req.body.area1=="all")? '%%':'%'+req.body.area1+'%';
    var area2 = (req.body.area2=="all")? '%%':'%'+req.body.area2+'%';
    var date1 = req.body.date1;
    var date2 = req.body.date2;

    var result = lib.mysql.searchAdminNotice([title, gender, age, area1, area2, date1, date2]);
    res.json(result);
  });

  app.get('/json/admin/notice/search/id/:id', function (req, res) {
    var id = req.params.id;
    var result = lib.mysql.findAdminNoticeId ([id]);
    res.json (result);
  });

  /////////////////////////////////////////////////////////////////////////
  // ADMIN-CLASS-SEARCH
  app.post('/json/admin/class/search', function (req, res) {
    var name  = (req.body.bizname =="all")? '%%':'%'+req.body.bizname+'%';
    var date1 = req.body.date1;
    var date2 = req.body.date2;

    var result = lib.mysql.searchAdminClass([name, date1, date2]);
    res.json(result);
  });

  /////////////////////////////////////////////////////////////////////////
  // MEMBER-DASHBOARD-SEARCH
  app.post('/json/member/dashboard/search', function (req, res) {
    var rcn   = req.body.rcn;
    var cond  = req.body.cond;
    var date1 = req.body.date1;
    var date2 = req.body.date2;
    var result = "";

    switch (cond) {
    case "일": result = lib.mysql.searchMemberDashDay ([rcn, date1, date2]); break;
    case "주": result = lib.mysql.searchMemberDashWeek([rcn, date1, date2]); break;
    case "월": result = lib.mysql.searchMemberDashMon ([rcn, date1, date2]); break;
    }
    res.json(result);
  });

  app.post('/json/member/dashboard/search/range', function (req, res) {
    var rcn   = req.body.rcn;
    var maxid = req.body.maxid;
    var minid = req.body.minid;

    var result = lib.mysql.searchMemberDashRange ([rcn, minid, maxid]);
    res.json(result);
  });

  /////////////////////////////////////////////////////////////////////////
  // MEMBER-DASHBOARD-SEARCH
  app.post('/json/member/coupon/search', function (req, res) {
    var rcn    = req.body.rcn;
    var ctype  = req.body.ctype;
    var name   = req.body.name;
    var status = req.body.status;
    var date1  = req.body.date1;
    var date2  = req.body.date2;
    var result = "";

    var result = lib.mysql.searchMemberCoupon ([rcn, ctype, name, status, date1, date2]);
    res.json(result);
  });








  ///////////////////////////////////////////////////////////////////////////////////////////////
  //
  // UPDATE
  //
  app.post('/json/admin/member/update', function (req, res) {
    var id     = req.body.id;
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

    var result = lib.mysql.updAdminMember([name, owner, bzcond, bztype, bzname, phone, date1, area1, area2, addr, lat, lng, id]);
    res.json(result);
  });

  app.post('/json/admin/member/update/passwd', function (req, res) {
    var id = req.body.id;
    var passwd = req.body.passwd1;

    var result = lib.mysql.updAdminMemberPassword([passwd, id]);
    res.json(result);
  });

  app.post('/json/admin/user/update', function (req, res) {
    var id     = req.body.id;
    var status = req.body.status;
    var gender = req.body.gender;
    var date1  = req.body.date1;
    var area1  = req.body.area1;
    var area2  = req.body.area2;

    var d = date1.split("-");
    console.log (d);
    var result = lib.mysql.updAdminUser([d[0], d[1], d[2], gender, area1, area2, status, id]);
    res.json(result);
  });

  app.post('/json/admin/user/update/passwd', function (req, res) {
    var id = req.body.id;
    var passwd = req.body.passwd1;

    var result = lib.mysql.updAdminUserPassword([passwd, id]);
    res.json(result);
  });


  app.post('/json/admin/coupon/update', function (req, res) {
    var id      = req.body.id;
    var name    = req.body.name;
    var status  = req.body.status;
    var date1   = req.body.date1;
    var date2   = req.body.date2;
    var benefit = req.body.benefit;
    var notice  = req.body.notice;

    var result = lib.mysql.updAdminCoupon([name, status, date1, date2, benefit, notice, id]);
    res.json(result);
  });

  app.post('/json/admin/event/update', function (req, res) {
    var id      = req.body.id;
    var title   = req.body.title;
    var status  = req.body.status;
    var fweight = req.body.fweight;
    var fnotice = req.body.fnotice;
    var fmain   = req.body.fmain;
    var fevent  = req.body.fevent;
    var gender  = req.body.gender;
    var age     = req.body.age;
    var area1   = req.body.area1;
    var area2   = req.body.area2;
    var date1   = req.body.date1;
    var date2   = req.body.date2;
    var prefix1 = req.body.prefix1;
    var prefix2 = req.body.prefix2;
    var prefix3 = req.body.prefix3;
    var rgb1    = req.body.rgb1;
    var rgb2    = req.body.rgb2;
    var coupon  = req.body.coupon;
    var date3   = req.body.date3;
    var date4   = req.body.date4;

    let File1, File2, File3, File4, File5, File6, File7, File8, File9, uploadPath;

    console.log('req.files >>>', req.files); // eslint-disable-line

    if (req.files.file1 && req.files.file2 && req.files.file3) {

      File1 = req.files.file1;
      uploadPath = __dirname + '/../public/rc/banner/' + `${prefix1}.png`;
      File1.mv(uploadPath, function(err) {
        if (err) { return res.status(500).send(err); }
      });

      File2 = req.files.file2;
      uploadPath = __dirname + '/../public/rc/banner/' + `${prefix1}@2x.png`;
      File2.mv(uploadPath, function(err) {
        if (err) { return res.status(500).send(err); }
      });

      File3 = req.files.file3;
      uploadPath = __dirname + '/../public/rc/banner/' + `${prefix1}@3x.png`;
      File3.mv(uploadPath, function(err) {
        if (err) { return res.status(500).send(err); }
      });
    }

    if (req.files.file4 && req.files.file5 && req.files.file6) {
      console.log('req.files >>>', req.files); // eslint-disable-line

      File4 = req.files.file4;
      uploadPath = __dirname + '/../public/rc/banner/' + `${prefix1}.png`;
      File4.mv(uploadPath, function(err) {
        if (err) { return res.status(500).send(err); }
      });

      File5 = req.files.file5;
      uploadPath = __dirname + '/../public/rc/banner/' + `${prefix1}@2x.png`;
      File5.mv(uploadPath, function(err) {
        if (err) { return res.status(500).send(err); }
      });

      File6 = req.files.file6;
      uploadPath = __dirname + '/../public/rc/banner/' + `${prefix1}@3x.png`;
      File6.mv(uploadPath, function(err) {
        if (err) { return res.status(500).send(err); }
      });
    }

    if (req.files.file7 && req.files.file8 && req.files.file9) {
      console.log('req.files >>>', req.files); // eslint-disable-line

      File7 = req.files.file7;
      uploadPath = __dirname + '/../public/rc/banner/' + `${prefix1}.png`;
      File7.mv(uploadPath, function(err) {
        if (err) { return res.status(500).send(err); }
      });

      File8 = req.files.file8;
      uploadPath = __dirname + '/../public/rc/banner/' + `${prefix1}@2x.png`;
      File8.mv(uploadPath, function(err) {
        if (err) { return res.status(500).send(err); }
      });

      File9 = req.files.file9;
      uploadPath = __dirname + '/../public/rc/banner/' + `${prefix1}@3x.png`;
      File9.mv(uploadPath, function(err) {
        if (err) { return res.status(500).send(err); }
      });
    }

    var result = lib.mysql.updAdminEvent([title, status, fnotice, fweight, fmain, fevent, gender, age, area1, area2, date1, date2, prefix1, prefix2, prefix3, rgb1, rgb2, coupon, date3, date4, '', id]);
    res.json(result);
  });

  app.post('/json/admin/notice/update', function (req, res) {
    var id      = req.body.id;
    var title   = req.body.title;
    var gender  = req.body.gender;
    var age     = req.body.age;
    var area1   = req.body.area1;
    var area2   = req.body.area2;
    var date1   = req.body.date1;
    var date2   = req.body.date2;
    var notice  = req.body.notice;
    var prefix1 = req.body.prefix1;

    let File1, File2, File3, uploadPath;

    if (req.files && Object.keys(req.files).length === 3) {
      console.log('req.files >>>', req.files); // eslint-disable-line

      File1 = req.files.file1;
      uploadPath = __dirname + '/../public/rc/banner/' + `${prefix1}.png`;
      File1.mv(uploadPath, function(err) {
        if (err) { return res.status(500).send(err); }
      });

      File2 = req.files.file2;
      uploadPath = __dirname + '/../public/rc/banner/' + `${prefix1}@2x.png`;
      File2.mv(uploadPath, function(err) {
        if (err) { return res.status(500).send(err); }
      });

      File3 = req.files.file3;
      uploadPath = __dirname + '/../public/rc/banner/' + `${prefix1}@3x.png`;
      File3.mv(uploadPath, function(err) {
        if (err) { return res.status(500).send(err); }
      });
    }

    var result = lib.mysql.updAdminNotice([title, gender, age, area1, area2, date1, date2, notice, prefix1, id]);
    res.json(result);
  });



  ///////////////////////////////////////////////////////////////////////////////////////////////
  //
  // UTILS
  //
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

  app.get('/json/admin/member/coupon/checkup/:cpcode', function (req, res) {
    var cpcode  = req.params.cpcode;

    var result = lib.mysql.getAdminCouponCpcode ([cpcode]);
    res.json (result);
  });

  app.get('/json/admin/coupon/select', function (req, res) {
    var result = lib.mysql.getAdminCouponAll ([]);
    res.json (result);
  });

  app.get('/json/admin/email-check/:email', function (req, res) {
    var email  = req.params.email;

    var result = lib.mysql.getAdminAdminEmail (email);
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
