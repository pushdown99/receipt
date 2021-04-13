'use strict';

function checkFiles (req, start, end) {
  if(req.files == undefined) return false;

  for (var i = start; i <= end; i++) {
    switch(i) {
    case  1: if(req.files.file1  == undefined || req.files.file1.name  == undefined) return false; break;
    case  2: if(req.files.file2  == undefined || req.files.file2.name  == undefined) return false; break;
    case  3: if(req.files.file3  == undefined || req.files.file3.name  == undefined) return false; break;
    case  4: if(req.files.file4  == undefined || req.files.file4.name  == undefined) return false; break;
    case  5: if(req.files.file5  == undefined || req.files.file5.name  == undefined) return false; break;
    case  6: if(req.files.file6  == undefined || req.files.file6.name  == undefined) return false; break;
    case  7: if(req.files.file7  == undefined || req.files.file7.name  == undefined) return false; break;
    case  8: if(req.files.file8  == undefined || req.files.file8.name  == undefined) return false; break;
    case  9: if(req.files.file9  == undefined || req.files.file9.name  == undefined) return false; break;
    case 10: if(req.files.file10 == undefined || req.files.file10.name == undefined) return false; break;
    case 11: if(req.files.file11 == undefined || req.files.file11.name == undefined) return false; break;
    case 12: if(req.files.file12 == undefined || req.files.file12.name == undefined) return false; break;
    }
  }
  console.log('true', start, end);
  return true;
}

function moveFiles (req, number, path, prefix) {
  if(req.files == undefined) return false;

  var f, e, u;

  switch(number) {
  case  1: 
    if(req.files.file1  == undefined) return false;
    f = req.files.file1;
    break;
  case  2: 
    if(req.files.file2  == undefined) return false;
    f = req.files.file2;
    break;
  case  3: 
    if(req.files.file3  == undefined) return false;
    f = req.files.file3;
    break;
  case  4: 
    if(req.files.file4  == undefined) return false;
    f = req.files.file4;
    break;
  case  5: 
    if(req.files.file5  == undefined) return false;
    f = req.files.file5;
    break;
  case  6: 
    if(req.files.file6  == undefined) return false;
    f = req.files.file6;
    break;
  case  7: 
    if(req.files.file7  == undefined) return false;
    f = req.files.file7;
    break;
  case  8: 
    if(req.files.file8  == undefined) return false;
    f = req.files.file8;
    break;
  case  9: 
    if(req.files.file9  == undefined) return false;
    f = req.files.file9;
    break;
  case 10: 
    if(req.files.file10 == undefined) return false;
    f = req.files.file10;
    break;
  case 11: 
    if(req.files.file11 == undefined) return false;
    f = req.files.file11;
    break;
  case 12: 
    if(req.files.file12 == undefined) return false;
    f = req.files.file12;
    break;
  }

  switch(number%3) {
  case 0: e = "@3x.png"; break;
  case 2: e = "@2x.png"; break;
  case 1: e = ".png";    break;
  }

  u = `${path}/${prefix}${e}`;
  console.log('upload', u);
  f.mv(u, function(err) {
    if (err) { return false; }
  });
  return true;
}

module.exports = function (app) {
  let moment  = require('moment-timezone');
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
    var register = req.body.register;
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
    var result = lib.mysql.putAdminMember([rcn, passwd, name, owner, bzcond, bztype, bzname, phone, date1, area1, area2, addr, lat, lng, register]);
    res.json(result);
  });

  /////////////////////////////////////////////////////////////////////////
  // ADMIN-COUPON-REGISTER
  app.post('/json/admin/coupon/register', function (req, res) {
    var register= req.body.register;
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

    var result = lib.mysql.putAdminCoupon ([member, rcn, bzcode, "프로모션", cpcode, 'Y', name, 0, 0, date1, date2, status, benefit, notice, register]);
    res.json (result);
  });

  /////////////////////////////////////////////////////////////////////////
  // ADMIN-EVENT-REGISTER
  app.post('/json/admin/event/register', function (req, res) {
    var register= req.body.register;
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
    var rgb1    = req.body.rgb1;
    var rgb2    = req.body.rgb2;
    var coupon  = req.body.coupon;
    var date3   = req.body.date3;
    var date4   = req.body.date4;
    var cid     = req.body.cid;

    var id = lib.mysql.getAdminEventAutoInc();
    var event = "";
    var main = "";
    var detail = "";

    if(checkFiles(req, 1, 3) == true) {
      event = `event-event-${id}`;
      moveFiles(req, 1, __dirname + '/../public/rc/banner', event);
      moveFiles(req, 2, __dirname + '/../public/rc/banner', event);
      moveFiles(req, 3, __dirname + '/../public/rc/banner', event);
      event = `/rc/banner/event-event-${id}`;
    }
    if(checkFiles(req, 4, 6) == true) {
      main = `event-main-${id}`;
      moveFiles(req, 4, __dirname + '/../public/rc/banner', main);
      moveFiles(req, 5, __dirname + '/../public/rc/banner', main);
      moveFiles(req, 6, __dirname + '/../public/rc/banner', main);
      main = `/rc/banner/event-main-${id}`;
    }
    if(checkFiles(req, 7, 9) == true) {
      detail = `event-detail-${id}`;
      moveFiles(req, 7, __dirname + '/../public/rc/banner', detail);
      moveFiles(req, 8, __dirname + '/../public/rc/banner', detail);
      moveFiles(req, 9, __dirname + '/../public/rc/banner', detail);
      detail = `/rc/banner/event-detail-${id}`;
    }

console.log ([title, status, fnotice, fweight, fmain, fevent, gender, age, area1, area2, date1, date2, event, main, detail, rgb1, rgb2, coupon, date3, date4,  `/publish/event/coupon/${cid}`, register]);
    var result = lib.mysql.putAdminEvent ([title, status, fnotice, fweight, fmain, fevent, gender, age, area1, area2, date1, date2, event, main, detail, rgb1, rgb2, coupon, date3, date4,  `/publish/event/coupon/${cid}`, register]);
    res.json(result[0]);
  });

  /////////////////////////////////////////////////////////////////////////
  // ADMIN-POS-REGISTER
  app.post('/json/admin/pos/version/register', function (req, res) {
    var register    = req.body.register;
    var version     = req.body.version;
    var fupdate     = req.body.fupdate;
    var description = req.body.description;

    var id = lib.mysql.getAdminPosVersionAutoInc();

    var setup = `setup-${version}`;
    var f     = req.files.file1;
    var p     = __dirname + '/../public/rc/install';
    var u     = `${p}/${setup}.exe`;
    f.mv(u, function(err) {
      if (err) { res.json({}); }
    });
    setup = `/rc/install/setup-${version}.exe`;

    var result = lib.mysql.putAdminPosVersion ([setup, version, f.size, fupdate, description, register]);
    res.json(result[0]);
  });

  /////////////////////////////////////////////////////////////////////////
  // ADMIN-NOTICE-REGISTER
  app.post('/json/admin/notice/register', function (req, res) {
    var register = req.body.register;
    var title    = req.body.title;
    var gender   = req.body.gender;
    var age      = req.body.age;
    var area1    = req.body.area1;
    var area2    = req.body.area2;
    var date1    = req.body.date1;
    var date2    = req.body.date2;
    var notice   = req.body.notice;

    var id = lib.mysql.getAdminNoticeAutoInc();
    var detail = "";

    if(checkFiles(req, 1, 3) == true) {
      detail = `notice-${id}`;
      moveFiles(req, 1, __dirname + '/../public/rc/banner', detail);
      moveFiles(req, 2, __dirname + '/../public/rc/banner', detail);
      moveFiles(req, 3, __dirname + '/../public/rc/banner', detail);
      detail = `/rc/banner/notice-${id}`;
    }

    var result = lib.mysql.putAdminNotice ([title, gender, age, area1, area2, date1, date2, notice, detail]);
    res.json(result);
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
    var register = req.body.register;

    var result = lib.mysql.putAdminAdmin ([email, password, name, mobile, phone, role, status, register]);
    res.json (result);
  });

  /////////////////////////////////////////////////////////////////////////
  // ADMIN-CLASS-REGISTER
  app.post('/json/admin/class/register', function (req, res) {
    var name      = req.body.name;
    var register  = req.body.register;

    var id = lib.mysql.getAdminClassAutoInc();
    var icon = "";
    if(checkFiles(req, 1, 3) == true) {
      icon = `icon-${id}`;
      moveFiles(req, 1, __dirname + '/../public/rc/images', icon);
      moveFiles(req, 2, __dirname + '/../public/rc/images', icon);
      moveFiles(req, 3, __dirname + '/../public/rc/images', icon);
      icon = `/rc/images/icon-${id}`;
    }
    var result = lib.mysql.putAdminClass ([name, icon, register]);
    res.json (result);
  });

  /////////////////////////////////////////////////////////////////////////
  // ADMIN-GROUP-REGISTER
  app.post('/json/admin/group/register', function (req, res) {
    var gname    = req.body.gname;
    var pattern  = req.body.pattern;
    var depth    = req.body.depth;
    var name     = req.body.name;
    var fcoupon  = req.body.fcoupon;
    var fevent   = req.body.fevent;
    var fnotice  = req.body.fnotice;
    var fadmin   = req.body.fadmin;
    var fgroup   = req.body.fgroup;
    var homepage = req.body.homepage;
    var register = req.body.register;

    var gtype    = (gname == '시스템관리자' || gname == '운영관리자')? 'SYSTEM':'관리자';

    var result = lib.mysql.putAdminGroup ([gname, pattern, gtype, depth, name, fcoupon, fevent, fnotice, fadmin, fgroup, homepage, register]);
    res.json (result);
  });

  /////////////////////////////////////////////////////////////////////////
  // MEMBER-COUPON-REGISTER
  app.post('/json/member/coupon/register', function (req, res) {
    var member  = req.body.member;
    var rcn     = req.body.rcn;
    var bzname  = req.body.bzname;
    var ctype   = req.body.ctype;
    var cpcode  = req.body.cpcode;
    var cpname  = req.body.cpname;
    var cash    = (req.body.cash == "")? 0: parseInt(req.body.cash);
    var stamp   = parseInt(req.body.stamp);
    var date1   = req.body.date1;
    var date2   = req.body.date2;
    var status  = req.body.status;
    var benefit = req.body.benefit;
    var notice  = req.body.notice;

console.log("params", cash, stamp);

    var result = lib.mysql.putMemberCoupon ([member, rcn, bzname, ctype, cpcode, 'N', cpname, cash, stamp, date1, date2, status, benefit, notice]);
    res.json (result);
  });

  ///////////////////////////////////////////////////////////////////////////////////////////////
  //
  // SEARCH
  //

  /////////////////////////////////////////////////////////////////////////
  // ADMIN-DASHBOARD-MEMBER
  app.post('/json/admin/dashboard/main', function (req, res) {
    var date1 = req.body.date1;

    var data = {};
    for(var i=0; i < 10; i++) {
      var date = moment(date1, 'YYYY-MM-DD').subtract(i,'days').format('YYYY-MM-DD');

      var member = lib.mysql.searchStatMembers([date]);
      var user   = lib.mysql.searchStatUsers([date]);
      var admin  = lib.mysql.searchStatAdmin([date]);
      var deal   = lib.mysql.searchStatDeal([date]);
      var coupon = lib.mysql.searchStatCoupon([date]);
      var stamp  = lib.mysql.searchStatStamp([date]);

      if (i == 0) {
        data.member = member;
        data.user   = user;
        data.admin  = admin;
        data.deal   = deal;
        data.coupon = coupon;
        data.stamp  = stamp;
        data.member_regi_spark = [];
        data.member_term_spark = [];
        data.user_regi_spark = [];
        data.user_term_spark = [];
        data.admin_regi_spark = [];
        data.admin_term_spark = [];
        data.deal_deal_spark = [];
        data.coupon_promotion_spark = [];
        data.coupon_reward_spark = [];
        data.coupon_stamp_spark = [];
        data.stamp_accum_spark = [];
        data.stamp_del_spark = [];
        data.stamp_term_spark = [];
        data.stamp_xchg_spark = [];
      }
      data.member_regi_spark.push(member.regi);
      data.member_term_spark.push(member.term);
      data.user_regi_spark.push(user.regi);
      data.user_term_spark.push(user.term);
      data.admin_regi_spark.push(user.regi);
      data.admin_term_spark.push(user.term);
      data.deal_deal_spark.push(deal.deal);
      data.coupon_promotion_spark.push(coupon.promotion);
      data.coupon_reward_spark.push(coupon.reward);
      data.coupon_stamp_spark.push(coupon.stamp);
      data.stamp_accum_spark.push(stamp.accum);
      data.stamp_xchg_spark.push(stamp.xchg);
      data.stamp_del_spark.push(stamp.del);
      data.stamp_term_spark.push(stamp.term);
    }
    data.member_regi_spark.reverse();
    data.member_term_spark.reverse();
    data.user_regi_spark.reverse();
    data.user_term_spark.reverse();
    data.admin_regi_spark.reverse();
    data.admin_term_spark.reverse();
    data.deal_deal_spark.reverse();
    data.coupon_promotion_spark.reverse();
    data.coupon_reward_spark.reverse();
    data.coupon_stamp_spark.reverse();
    data.stamp_accum_spark.reverse();
    data.stamp_xchg_spark.reverse();
    data.stamp_del_spark.reverse();
    data.stamp_term_spark.reverse();
    res.json(data);
  });

  /////////////////////////////////////////////////////////////////////////
  // ADMIN-DASHBOARD-MEMBER
  app.post('/json/admin/dashboard/member', function (req, res) {
    var cond  = req.body.cond;
    var date1 = req.body.date1;
    var date2 = req.body.date2;


    switch (cond) {
    case '일':
      var result = lib.mysql.searchAdminMemberDay([date1, date2, date1, date2]);
      return res.json(result);
      break;
    case '주':
      var result = lib.mysql.searchAdminMemberWeek([date1, date2, date1, date2]);
      return res.json(result);
      break;
    case '월':
      var result = lib.mysql.searchAdminMemberMonth([date1, date2, date1, date2]);
      return res.json(result);
      break;
    }
  });

  /////////////////////////////////////////////////////////////////////////
  // ADMIN-DASHBOARD-USER
  app.post('/json/admin/dashboard/user', function (req, res) {
    var cond  = req.body.cond;
    var date1 = req.body.date1;
    var date2 = req.body.date2;

    
    switch (cond) {
    case '일':
      var result = lib.mysql.searchAdminGenderDay([date1, date2, date1, date2]);
      return res.json(result);
      break;
    case '주':
      var result = lib.mysql.searchAdminGenderWeek([date1, date2, date1, date2]);
      return res.json(result);
      break;
    case '월':
      var result = lib.mysql.searchAdminGenderMonth([date1, date2, date1, date2]);
      return res.json(result);
      break;
    }
  });

  /////////////////////////////////////////////////////////////////////////
  // ADMIN-DASHBOARD-DEAL
  app.post('/json/admin/dashboard/deal', function (req, res) {
    var cond  = req.body.cond;
    var date1 = req.body.date1;
    var date2 = req.body.date2;


    switch (cond) {
    case '일':
      var result = lib.mysql.searchUserDealDay([date1, date2, date1, date2]);
      return res.json(result);
      break;
    case '주':
      var result = lib.mysql.searchUserDealWeek([date1, date2, date1, date2]);
      return res.json(result);
      break;
    case '월':
      var result = lib.mysql.searchUserDealMonth([date1, date2, date1, date2]);
      return res.json(result);
      break;
    }
  });

  /////////////////////////////////////////////////////////////////////////
  // ADMIN-DASHBOARD-STAMP
  app.post('/json/admin/dashboard/stamp', function (req, res) {
    var cond  = req.body.cond;
    var date1 = req.body.date1;
    var date2 = req.body.date2;


    switch (cond) {
    case '일':
      var result = lib.mysql.searchUserStampDay([date1, date2, date1, date2]);
      return res.json(result);
      break;
    case '주':
      var result = lib.mysql.searchUserStampWeek([date1, date2, date1, date2]);
      return res.json(result);
      break;
    case '월':
      var result = lib.mysql.searchUserStampMonth([date1, date2, date1, date2]);
      return res.json(result);
      break;
    }
  });

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

console.log([rcn, rcn, date1, date2, email]);

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

  app.post('/json/admin/coupon/search/id/:id', function (req, res) {
    var id = req.params.id;
    var result = lib.mysql.findAdminCouponId ([id]);
    res.json (result);
  });

  /////////////////////////////////////////////////////////////////////////
  // ADMIN-EVENT-SEARCH
  app.post('/json/admin/event/search', function (req, res) {
    var coupon  = (req.body.coupon == "all")? "%%": req.body.coupon;
    var status  = (req.body.status == "all")? "%%": req.body.status;
    var date1   = req.body.date1;
    var date2   = req.body.date2;

    var result = lib.mysql.searchAdminEvent ([status, coupon, date1, date2]);
    res.json (result);
  });

  app.post('/json/admin/event/search/id/:id', function (req, res) {
    var id      = req.params.id;
    var updater = req.body.updater;

    var event = lib.mysql.findAdminEventId ([id]);
    lib.mysql.putAdminEventHistory ([event.title, '', updater, moment().format("YYYY-MM-DD HH:mm:ss"), '조회', '','상세조회']);
    res.json (event);
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

    var notice = lib.mysql.searchAdminNotice([title, gender, age, area1, area2, date1, date2]);
    res.json(notice);
  });

  app.post('/json/admin/notice/search/id/:id', function (req, res) {
    var id = req.params.id;
    var updater = req.body.updater;

    var notice = lib.mysql.findAdminNoticeId ([id]);
    lib.mysql.putAdminNoticeHistory ([notice.title, '', updater, moment().format("YYYY-MM-DD HH:mm:ss"), '조회', '','상세조회']);
    res.json (notice);
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

  app.get('/json/admin/class/search/id/:id', function (req, res) {
    var id = req.params.id;
    var result = lib.mysql.findAdminClassId ([id]);
    res.json (result);
  });

  /////////////////////////////////////////////////////////////////////////
  // ADMIN-ADMIN-SEARCH
  app.post('/json/admin/admin/search', function (req, res) {
    var name  = (req.body.name =="all")? '%%':'%'+req.body.name+'%';
    var stat  = (req.body.stat=="all")? '%%':'%'+req.body.stat+'%';
    var grade = (req.body.grade=="all")? '%%':'%'+req.body.grade+'%';
    var date1 = req.body.date1;
    var date2 = req.body.date2;

    var result = lib.mysql.getAdminAdmin([name, grade, stat, date1, date2]);
    res.json(result);
  });

  app.get('/json/admin/admin/search/id/:id', function (req, res) {
    var id = req.params.id;
    var result = lib.mysql.findAdminAdminId ([id]);
    res.json (result);
  });

  /////////////////////////////////////////////////////////////////////////
  // ADMIN-GROUP-SEARCH
  app.post('/json/admin/group/search', function (req, res) {
    var name  = (req.body.name =="all")? '%%':'%'+req.body.name+'%';
    var date1 = req.body.date1;
    var date2 = req.body.date2;
    var grade = '%'+req.body.grade+'%';

    var result = lib.mysql.getAdminGroup([name, date1, date2, grade]);
    res.json(result);
  });

  app.get('/json/admin/group/search/id/:id', function (req, res) {
    var id = req.params.id;
    var result = lib.mysql.findAdminGroupId ([id]);
    res.json (result);
  });

  /////////////////////////////////////////////////////////////////////////
  // ADMIN-POS-SEARCH
  app.post('/json/admin/license/search', function (req, res) {
    var name    = (req.body.name =="all")? '%%':'%'+req.body.name+'%';
    var status  = (req.body.status =="all")? '%%':'%'+req.body.status+'%';
    var license = (req.body.license =="all")? '%%':'%'+req.body.license+'%';
    var date1 = req.body.date1;
    var date2 = req.body.date2;

    var result = lib.mysql.getAdminLicense([name, name, status, license, date1, date2]);
    for(var i = 0; i < result.length; i++) {
      var pos = result[i];
      console.log(result[i]);
      result[i].member = lib.mysql.searchMemberByRcn ([pos.rcn]);
    }
    res.json(result);
  });

  app.post('/json/admin/monitor/search', function (req, res) {
    var name    = (req.body.name =="all")? '%%':'%'+req.body.name+'%';
    var version = (req.body.version =="all")? '%%':'%'+req.body.version+'%';
    var status  = (req.body.status =="all")? '%%':'%'+req.body.status+'%';
    var network = (req.body.network =="all")? '%%':'%'+req.body.network+'%';

    var result = lib.mysql.getAdminMonitor([name, name, version, status, network]);
    for(var i = 0; i < result.length; i++) {
      var pos = result[i];
      console.log(result[i]);
      result[i].member = lib.mysql.searchMemberByRcn ([pos.rcn]);
    }
    res.json(result);
  });

  app.get('/json/admin/pos/search/id/:id', function (req, res) {
    var id = req.params.id;
    var result = lib.mysql.getAdminPosId ([id]);
    result.member = lib.mysql.searchMemberByRcn ([result.rcn]);
    res.json (result);
  });

  app.post('/json/admin/pos/version/search', function (req, res) {
    var result = lib.mysql.getVersion([]);
    res.json(result);
  });

  app.get('/json/admin/pos/version/search/id/:id', function (req, res) {
    var id = req.params.id;
    var result = lib.mysql.getVersionId ([id]);
    res.json (result);
  });

  /////////////////////////////////////////////////////////////////////////
  // MEMBER-DASHBOARD-SEARCH
  app.post('/json/member/dashboard/search', function (req, res) {
    var rcn   = req.body.rcn;
    var cond  = req.body.cond;
    var date1 = req.body.date1;
    var date2 = req.body.date2;
    var result = "";

    date1  = (cond == '월')? moment(date1, 'YYYY-MM-DD').format('YYYY-MM'): date1;
    date2  = (cond == '월')? moment(date2, 'YYYY-MM-DD').format('YYYY-MM'): date2;
    result = lib.mysql.searchMemberDashDeal ([rcn, date1, date2, cond]);
    res.json(result);
  });

  app.post('/json/member/dashboard/search/range', function (req, res) {
    var rcn   = req.body.rcn;
    var maxid = req.body.maxid;
    var minid = req.body.minid;

    var result = lib.mysql.searchMemberDashDealRange ([rcn, minid, maxid]);
    res.json(result);
  });

  /////////////////////////////////////////////////////////////////////////
  // MEMBER-COUPON-SEARCH
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

  app.post('/json/member/coupon/search/id', function (req, res) {
    var id    = req.body.id;

    var result = lib.mysql.searchMemberCouponId ([id]);
    lib.utils.getQR2URL(result.cpcode, function (data) {
      result.qr = data;
      res.json(result);
    });
  });

  /////////////////////////////////////////////////////////////////////////
  // MEMBER-STAMP-SEARCH
  app.post('/json/member/stamp/search', function (req, res) {
    var rcn    = req.body.rcn;

    var result = lib.mysql.searchMemberStamp ([rcn]);
    res.json(result);
  });

  /////////////////////////////////////////////////////////////////////////
  // MEMBER-EVENT-SEARCH
  app.post('/json/member/event/search', function (req, res) {
    var rcn    = req.body.rcn;

    var result = lib.mysql.searchMemberEvent ([rcn]);
    res.json(result);
  });


  /////////////////////////////////////////////////////////////////////////
  // MEMBER-STAMP-SEARCH
  app.post('/json/member/detail/search', function (req, res) {
    var rcn    = req.body.rcn;

    var result = lib.mysql.searchMemberDetail ([rcn]);
    res.json(result);
  });


  ///////////////////////////////////////////////////////////////////////////////////////////////
  //
  // UPDATE
  //
  app.post('/json/admin/member/update', function (req, res) {
    var id     = req.body.id;
    var status = req.body.status;
    var exposure = req.body.exposure;
    var updater= req.body.updater;
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

    var result = lib.mysql.updAdminMember([status, exposure, name, owner, bzcond, bztype, bzname, phone, date1, area1, area2, addr, lat, lng, updater, id]);
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
    var updater= req.body.updater;
    var status = req.body.status;
    var gender = req.body.gender;
    var date1  = req.body.date1;
    var area1  = req.body.area1;
    var area2  = req.body.area2;

    var d = date1.split("-");
    console.log (d);
    var result = lib.mysql.updAdminUser([d[0], d[1], d[2], gender, area1, area2, status, updater, id]);
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
    var updater = req.body.updater;
    var name    = req.body.name;
    var status  = req.body.status;
    var date1   = req.body.date1;
    var date2   = req.body.date2;
    var benefit = req.body.benefit;
    var notice  = req.body.notice;

    var result = lib.mysql.updAdminCoupon([name, status, date1, date2, benefit, notice, updater, id]);
    res.json(result);
  });

  app.post('/json/admin/event/update', function (req, res) {
    var id      = req.body.id;
    var updater = req.body.updater;
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
    var event   = req.body.event;
    var main    = req.body.main;
    var detail  = req.body.detail;
    var rgb1    = req.body.rgb1;
    var rgb2    = req.body.rgb2;
    var coupon  = req.body.coupon;
    var cid     = req.body.cid;
    var date3   = req.body.date3;
    var date4   = req.body.date4;

    let File1, File2, File3, File4, File5, File6, File7, File8, File9, uploadPath;

    if(checkFiles(req, 1, 3) == true) {
      event = `event-event-${id}`;
      moveFiles(req, 1, __dirname + '/../public/rc/banner', event);
      moveFiles(req, 2, __dirname + '/../public/rc/banner', event);
      moveFiles(req, 3, __dirname + '/../public/rc/banner', event);
      event = `/rc/banner/event-event-${id}`;
    }
    if(checkFiles(req, 4, 6) == true) {
      main = `event-main-${id}`;
      moveFiles(req, 4, __dirname + '/../public/rc/banner', main);
      moveFiles(req, 5, __dirname + '/../public/rc/banner', main);
      moveFiles(req, 6, __dirname + '/../public/rc/banner', main);
      main = `/rc/banner/event-main-${id}`;
    }
    if(checkFiles(req, 7, 9) == true) {
      detail = `event-detail-${id}`;
      moveFiles(req, 7, __dirname + '/../public/rc/banner', detail);
      moveFiles(req, 8, __dirname + '/../public/rc/banner', detail);
      moveFiles(req, 9, __dirname + '/../public/rc/banner', detail);
      detail = `/rc/banner/event-detail-${id}`;
    }

    var result = lib.mysql.updAdminEvent([title, status, fnotice, fweight, fmain, fevent, gender, age, area1, area2, date1, date2, event, main, detail, rgb1, rgb2, coupon, date3, date4, `/publish/event/coupon/${cid}`, updater, id]);
    res.json(result);
  });

  app.post('/json/admin/group/update', function (req, res) {
    var id       = req.body.id;
    var gname    = req.body.gname;
    var name     = req.body.name;
    var fcoupon  = req.body.fcoupon;
    var fevent   = req.body.fevent;
    var fnotice  = req.body.fnotice;
    var fadmin   = req.body.fadmin;
    var fgroup   = req.body.fgroup;
    var homepage = req.body.homepage;
    var updater  = req.body.updater;

    var result = lib.mysql.updAdminGroup ([gname, name, fcoupon, fevent, fnotice, fadmin, fgroup, homepage, updater, id]);
    res.json (result);
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
    var detail  = req.body.detail;

    if(checkFiles(req, 1, 3) == true) {
      detail = `notice-${id}`;
      moveFiles(req, 1, __dirname + '/../public/rc/banner', detail);
      moveFiles(req, 2, __dirname + '/../public/rc/banner', detail);
      moveFiles(req, 3, __dirname + '/../public/rc/banner', detail);
      detail = `/rc/banner/notice-${id}`;
    }
    var result = lib.mysql.updAdminNotice([title, gender, age, area1, area2, date1, date2, notice, detail, id]);
    res.json(result);
  });

  app.post('/json/admin/admin/update', function (req, res) {
    var id      = req.body.id;
    var email   = req.body.email;
    var name    = req.body.name;
    var mobile  = req.body.mobile;
    var phone   = req.body.phone;
    var grade   = req.body.grade;
    var status  = req.body.status;
    var updater = req.body.updater;

    var result = lib.mysql.updAdminAdmin([name, mobile, phone, grade, status, updater, id]);
    res.json(result);
  });

  app.post('/json/admin/admin/update/passwd', function (req, res) {
    var id = req.body.id;
    var passwd = req.body.passwd1;

    var result = lib.mysql.updAdminAdminPassword([passwd, id]);
    res.json(result);
  });

  app.post('/json/admin/class/update', function (req, res) {
    var id      = req.body.id;
    var name    = req.body.name;
    var icon    = req.body.icon;
    var updater = req.body.updater;

    if(checkFiles(req, 1, 3) == true) {
      icon = `icon-${id}`;
      moveFiles(req, 1, __dirname + '/../public/rc/images', icon);
      moveFiles(req, 2, __dirname + '/../public/rc/images', icon);
      moveFiles(req, 3, __dirname + '/../public/rc/images', icon);
      icon = `/rc/banner/icon-${id}`;
    }
    var result = lib.mysql.updAdminClass([name, icon, updater, id]);
    res.json(result);
  });

  app.post('/json/admin/pos/license/update', function (req, res) {
    var id      = req.body.id;
    var updater = req.body.updater;
    var status  = req.body.status;

    var result = lib.mysql.updAdminPosLicense([status, updater, id]);
    res.json(result);
  });

  app.post('/json/admin/pos/version/update', function (req, res) {
    var id      = req.body.id;
    var updater = req.body.updater;
    var description = req.body.description;

    var result = lib.mysql.updAdminPosVersion([description, updater, id]);
    res.json(result);
  });

  app.post('/json/member/coupon/update/status', function (req, res) {
    var id     = req.body.id;
    var status = req.body.status;

    var result = lib.mysql.updMemberCouponStatus([status, id]);
    res.json(result);
  });

  /////////////////////////////////////////////////////////////////////////
  // MEMBER-STAMP-UPDATE
  app.post('/json/member/stamp/update', function (req, res) {
    var rcn       = req.body.rcn;
    var status    = req.body.status;
    var stamp     = req.body.stamp;
    var limits    = req.body.limits;
    var overagain = req.body.overagain;
    var benefit   = req.body.benefit;
    var notice    = req.body.notice;

    var result = lib.mysql.updMemberStamp ([status, stamp, limits, overagain, benefit, notice, rcn]);
    res.json(result);
  });

  /////////////////////////////////////////////////////////////////////////
  // MEMBER-EVENT-UPDATE
  app.post('/json/member/event/update', function (req, res) {
    var id           = req.body.id;
    var rcn          = req.body.rcn;
    var leaflet      = req.body.leaflet;
    var leaflet_sub1 = req.body.leaflet_sub1;
    var leaflet_sub2 = req.body.leaflet_sub2;
    var leaflet_sub3 = req.body.leaflet_sub3;

    if(checkFiles(req, 1, 3) == true) {
      leaflet = `leaflet-${id}`;
      moveFiles(req, 1, __dirname + '/../public/rc/images', leaflet);
      moveFiles(req, 2, __dirname + '/../public/rc/images', leaflet);
      moveFiles(req, 3, __dirname + '/../public/rc/images', leaflet);
      leaflet = `/rc/images/leaflet-${id}`;
    }
    if(checkFiles(req, 4, 6) == true) {
      leaflet_sub1 = `leaflet-sub1-${id}`;
      moveFiles(req, 4, __dirname + '/../public/rc/images', leaflet_sub1);
      moveFiles(req, 5, __dirname + '/../public/rc/images', leaflet_sub1);
      moveFiles(req, 6, __dirname + '/../public/rc/images', leaflet_sub1);
      leaflet_sub1 = `/rc/images/leaflet-sub1-${id}`;
    }
    if(checkFiles(req, 7, 9) == true) {
      leaflet_sub2 = `leaflet-sub2-${id}`;
      moveFiles(req, 7, __dirname + '/../public/rc/images', leaflet_sub2);
      moveFiles(req, 8, __dirname + '/../public/rc/images', leaflet_sub2);
      moveFiles(req, 9, __dirname + '/../public/rc/images', leaflet_sub2);
      leaflet_sub2 = `/rc/images/leaflet-sub2-${id}`;
    }
    if(checkFiles(req, 10, 12) == true) {
      leaflet_sub3 = `leaflet-sub3-${id}`;
      moveFiles(req, 10, __dirname + '/../public/rc/images', leaflet_sub3);
      moveFiles(req, 11, __dirname + '/../public/rc/images', leaflet_sub3);
      moveFiles(req, 12, __dirname + '/../public/rc/images', leaflet_sub3);
      leaflet_sub3 = `/rc/images/leaflet-sub3-${id}`;
    }

    var result = lib.mysql.updMemberEvent ([leaflet, leaflet_sub1, leaflet_sub2, leaflet_sub3, rcn]);
    res.json(result);
  });

  /////////////////////////////////////////////////////////////////////////
  // MEMBER-DETAIL-UPDATE
  app.post('/json/member/detail/update', function (req, res) {
    var id         = req.body.id;
    var rcn        = req.body.rcn;
    var logo       = req.body.logo;
    var intro      = req.body.intro;
    var offduty1   = req.body.offduty1;
    var offduty2   = req.body.offduty2;
    var opentime   = req.body.opentime;
    var closetime  = req.body.closetime;
    var resp_name  = req.body.resp_name;
    var resp_phone = req.body.resp_phone;
    var resp_email = req.body.resp_email;

    //var logo = `logo-${lib.mysql.getAdminMemberAutoInc()}`;
    if(checkFiles(req, 1, 3) == true) {
      logo = `logo-${id}`;
      moveFiles(req, 1, __dirname + '/../public/rc/images', logo);
      moveFiles(req, 2, __dirname + '/../public/rc/images', logo);
      moveFiles(req, 3, __dirname + '/../public/rc/images', logo);
      logo = `/rc/images/logo-${id}`;
    }

    var result = lib.mysql.updMemberDetail ([logo, intro, offduty1, offduty2, opentime, closetime, resp_name, resp_phone, resp_email, rcn]);
    res.json(result);
  });


  ///////////////////////////////////////////////////////////////////////////////////////////////
  //
  // DELETE
  //

  app.post('/json/admin/member/delete/id', function (req, res) {
    var id = req.body.id;

    var result = lib.mysql.delAdminMemberId([id]);
    res.json(result);
  });

  app.post('/json/admin/user/delete/id', function (req, res) {
    var id = req.body.id;
    var email = req.body.email;

    var result = lib.mysql.delAdminUserEmail([email]);
    var result = lib.mysql.delAdminUserId([id]);
    res.json(result);
  });

  app.post('/json/admin/coupon/delete/id', function (req, res) {
    var id = req.body.id;

    var result = lib.mysql.delAdminCouponId([id]);
    res.json(result);
  });

  app.post('/json/admin/event/delete/id', function (req, res) {
    var id = req.body.id;

    var result = lib.mysql.delAdminEventId([id]);
    res.json(result);
  });

  app.post('/json/admin/notice/delete/id', function (req, res) {
    var id = req.body.id;
    var updater = req.body.updater;

    var notice = lib.mysql.searchAdminNoticeById ([id]);
    var result = lib.mysql.delAdminNoticeId([id]);
    res.json(result);
  });

  app.post('/json/admin/admin/delete/id', function (req, res) {
    var id = req.body.id;

    var result = lib.mysql.delAdminAdminId([id]);
    res.json(result);
  });

  app.post('/json/admin/class/delete/id', function (req, res) {
    var id = req.body.id;

    var result = lib.mysql.delAdminClassId([id]);
    res.json(result);
  });

  app.post('/json/admin/group/delete/id', function (req, res) {
    var id = req.body.id;

    var result = lib.mysql.delAdminGroupId([id]);
    res.json(result);
  });

  /////////////////////////////////////////////////////////////////////////
  // MEMBER-COUPON-DELETE
  app.post('/json/member/coupon/delete/id', function (req, res) {
    var id = req.body.id;

    var result = lib.mysql.delMemberCouponId([id]);
    res.json(result);
  });

  app.post('/json/member/detail/delete', function (req, res) {
    var rcn        = req.body.rcn;

    var result = lib.mysql.delMemberDetailStatus ([rcn]);
    res.json(result);
  });

  app.post('/json/member/event/delete', function (req, res) {
    var rcn        = req.body.rcn;

    var result = lib.mysql.delMemberLeaflet ([rcn]);
    res.json(result);
  });


  ///////////////////////////////////////////////////////////////////////////////////////////////
  //
  // HISTORY
  //

  app.post('/json/admin/member/history', function (req, res) {
    var result = lib.mysql.searchMemberHistory ([]);
    res.json(result);
  });

  app.post('/json/admin/member/history/rcn/:rcn', function (req, res) {
    var rcn = req.params.rcn;
    var result = lib.mysql.searchMemberHistoryByRcn ([rcn]);
    res.json(result);
  });

  app.post('/json/admin/event/history', function (req, res) {
    var result = lib.mysql.searchEventHistory ([]);
    res.json(result);
  });
  app.post('/json/admin/coupon/history', function (req, res) {
    var result = lib.mysql.searchCouponHistory ([]);
    res.json(result);
  });
  app.post('/json/admin/notice/history', function (req, res) {
    var notice = lib.mysql.searchNoticeHistory ([]);
    res.json(notice);
  });
  app.post('/json/admin/admin/history', function (req, res) {
    var admin = lib.mysql.searchAdminHistory ([]);
    res.json(admin);
  });
  app.post('/json/admin/class/history', function (req, res) {
    var cl = lib.mysql.searchClassHistory ([]);
    res.json(cl);
  });
  app.post('/json/admin/user/history', function (req, res) {
    var user = lib.mysql.searchUserHistory ([]);
    res.json(user);
  });
  app.post('/json/admin/group/history', function (req, res) {
    var group = lib.mysql.searchGroupHistory ([]);
    res.json(group);
  });

  app.post('/json/member/coupon/history/:rcn', function (req, res) {
    var rcn = req.params.rcn;
    var result = lib.mysql.searchCouponHistoryRcn ([rcn]);
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

  app.post('/json/admin/user/age', function (req, res) {
    var cond  = req.body.cond;
    var date1 = req.body.date1;
    var date2 = req.body.date2;


    switch (cond) {
    case '일':
      var result = lib.mysql.searchAdminUserGenDay([date1, date2]);
      res.json(result);
      break;
    case '주':
      var result = lib.mysql.searchAdminUserGenWeek([date1, date2]);
      return res.json(result);
      break;
    case '월':
      var result = lib.mysql.searchAdminUserGenMonth([date1, date2]);
      return res.json(result);
      break;
    }
  });

  app.post('/json/admin/user/area', function (req, res) {
    var cond  = req.body.cond;
    var date1 = req.body.date1;
    var date2 = req.body.date2;

    switch (cond) {
    case '일':
      var result = lib.mysql.searchAdminUserDay([date1, date2]);
      res.json(result);
      break;
    case '주':
      var result = lib.mysql.searchAdminUserWeek([date1, date2]);
      return res.json(result);
      break;
    case '월':
      var result = lib.mysql.searchAdminUserMonth([date1, date2]);
      return res.json(result);
      break;
    }
  });

  app.post('/json/admin/profile/update', function (req, res) {
    var email  = req.body.email;
    var name   = req.body.name;
    var mobile = req.body.mobile;
    var phone  = req.body.phone;

    var result = lib.mysql.updAdminProfile ([name, mobile, phone, email]);
    res.json (result);
  });

  app.post('/json/member/profile/update', function (req, res) {
    var id     = req.body.id;
    var name   = req.body.name;
    var email  = req.body.email;
    var phone  = req.body.phone;

    var result = lib.mysql.updAdminMemberProfile ([name, phone, email, id]);
    res.json (result);
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

  app.get('/json/city/search', function (req, res) {
    var result = lib.mysql.getCityArea1 ();
    res.json(result);
  });

  app.get('/json/version/search', function (req, res) {
    var result = lib.mysql.getVersion ();
    res.json(result);
  });


  app.get('/json/group/search', function (req, res) {
    var result = lib.mysql.getGroup1 ();
    res.json(result);
  });

  app.get('/json/group/search/:name', function (req, res) {
    var name   = '%' + req.params.name + '%';
    var result = lib.mysql.getGroup1ByName ([name]);
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
      console.log (result[0].latitude, result[0].longitude);
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

  app.post('/json/import/admin/member/history', function (req, res) {
    var result = lib.mysql.allAdminMember ([]);
    result.forEach(e => {
      console.log (moment(e.registered).format('YYYY-MM-DD HH:mm:ss'));
      lib.mysql.putAdminMemberHistory([e.name, e.rcn, "", e.register, e.registered, '생성', '프로필', '']);
    });
    res.json ({});
  });

  app.post('/json/import/admin/users/history', function (req, res) {
    var result = lib.mysql.allAdminUser ([]);
    result.forEach(e => {
      console.log (moment(e.registered).format('YYYY-MM-DD HH:mm:ss'));
      lib.mysql.putAdminUserHistory([e.email, "", e.registered, '가입', '프로필', '']);
    });
    res.json ({});
  });

  app.post('/json/admin/member/history/register', function (req, res) {
    var name        = req.body.name;
    var rcn         = req.body.rcn;
    var menu        = req.body.menu;
    var updater     = req.body.updater;
    var updated     = req.body.updated;
    var done        = req.body.done;
    var division    = req.body.division;
    var description = req.body.description;

    lib.mysql.putAdminMemberHistory([name, rcn, menu, updater, updated, done, division, description]);
    res.json ({});
  });

  app.post('/json/admin/users/history/register', function (req, res) {
    var email       = req.body.email;
    var updater     = req.body.updater;
    var updated     = req.body.updated;
    var done        = req.body.done;
    var division    = req.body.division;
    var description = req.body.description;

    lib.mysql.putAdminUserHistory([email, updater, updated, done, division, description]);
    res.json ({});
  });

  app.post('/json/admin/coupon/history/register', function (req, res) {
    var rcn         = req.body.rcn;
    var name        = req.body.name;
    var menu        = req.body.menu;
    var updater     = req.body.updater;
    var updated     = req.body.updated;
    var done        = req.body.done;
    var division    = req.body.division;
    var description = req.body.description;

console.log ([rcn, name, menu, updater, updated, done, division, description]);
    lib.mysql.putAdminCouponHistory([rcn, name, menu, updater, updated, done, division, description]);
    res.json ({});
  });

  app.post('/json/admin/event/history/register', function (req, res) {
    var name        = req.body.name;
    var menu        = req.body.menu;
    var updater     = req.body.updater;
    var updated     = req.body.updated;
    var done        = req.body.done;
    var division    = req.body.division;
    var description = req.body.description;

    lib.mysql.putAdminEventHistory([name, menu, updater, updated, done, division, description]);
    res.json ({});
  });

  app.post('/json/admin/notice/history/register', function (req, res) {
    var name        = req.body.name;
    var menu        = req.body.menu;
    var updater     = req.body.updater;
    var updated     = req.body.updated;
    var done        = req.body.done;
    var division    = req.body.division;
    var description = req.body.description;

    lib.mysql.putAdminNoticeHistory([name, menu, updater, updated, done, division, description]);
    res.json ({});
  });

  app.post('/json/admin/group/history/register', function (req, res) {
    var name        = req.body.name;
    var menu        = req.body.menu;
    var updater     = req.body.updater;
    var updated     = req.body.updated;
    var done        = req.body.done;
    var division    = req.body.division;
    var description = req.body.description;

    lib.mysql.putAdminGroupHistory([name, menu, updater, updated, done, division, description]);
    res.json ({});
  });

  app.post('/json/admin/class/history/register', function (req, res) {
    var name        = req.body.name;
    var menu        = req.body.menu;
    var updater     = req.body.updater;
    var updated     = req.body.updated;
    var done        = req.body.done;
    var division    = req.body.division;
    var description = req.body.description;

    lib.mysql.putAdminClassHistory([name, menu, updater, updated, done, division, description]);
    res.json ({});
  });

  app.post('/json/admin/admin/history/register', function (req, res) {
    var name        = req.body.name;
    var menu        = req.body.menu;
    var updater     = req.body.updater;
    var updated     = req.body.updated;
    var done        = req.body.done;
    var division    = req.body.division;
    var description = req.body.description;

    lib.mysql.putAdminAdminHistory([name, menu, updater, updated, done, division, description]);
    res.json ({});
  });

  app.post('/json/admin/license/history/register', function (req, res) {
    var name        = req.body.name;
    var menu        = req.body.menu;
    var updater     = req.body.updater;
    var updated     = req.body.updated;
    var done        = req.body.done;
    var division    = req.body.division;
    var description = req.body.description;

    lib.mysql.putPosLicenseHistory([name, menu, updater, updated, done, division, description]);
    res.json ({});
  });

  app.post('/json/admin/monitor/history/register', function (req, res) {
    var name        = req.body.name;
    var menu        = req.body.menu;
    var updater     = req.body.updater;
    var updated     = req.body.updated;
    var done        = req.body.done;
    var division    = req.body.division;
    var description = req.body.description;

    lib.mysql.putPosMonitorHistory([name, menu, updater, updated, done, division, description]);
    res.json ({});
  });

  app.post('/json/admin/version/history/register', function (req, res) {
    var name        = req.body.name;
    var menu        = req.body.menu;
    var updater     = req.body.updater;
    var updated     = req.body.updated;
    var done        = req.body.done;
    var division    = req.body.division;
    var description = req.body.description;

    lib.mysql.putPosVersionHistory([name, menu, updater, updated, done, division, description]);
    res.json ({});
  });



////////////////////////////////////////////////////////////////////////////////////////////
//
// GENERATION
//
  app.get('/generate/receipt/:email', function (req, res) {
    var email = req.params.email; 

    console.log ('email', email);
    lib.utils.postJSON('/qrcode', {email: email}).catch(err => console.log('err', err)).then(function (result) { // QRcode
      console.log (result.data);
      lib.utils.getJSON ('/issue/1234/' + result.data.data.qrcode, {email: email}).catch(err => console.log('err', err)).then(function (result) {
        lib.utils.postJSON('/receipt/probe/1234', {Data:lib.utils.genReceiptBody()});
        return res.json({});
      });
    });
  });


  app.get('/generate/coupon/:email', function (req, res) {
    var email = req.params.email;

    console.log ('email', email);
    lib.utils.postJSON('/qrcode', {email: email}).catch(err => console.log('err', err)).then(function (result) {
      console.log (result.data);
      lib.utils.getJSON ('/issue/1234/' + result.data.data.qrcode, {email: email}).catch(err => console.log('err', err)).then(function (result) {
        lib.utils.postJSON('/receipt/probe/1234', {Data:lib.utils.genReceiptBody()});
        return res.json({});
      });
    });
  });

}
