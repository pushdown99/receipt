'use strict';

let lib     = require('../lib');
let router  = require('.');
let random  = require("random");
let moment  = require('moment-timezone');
let iconv   = require('iconv-lite');
let fs      = require('fs');
let csv     = require('csv-reader');
let auto    = require('autodetect-decoder-stream');
  
function insSampleUsers () {
  var email      = `${lib.utils.generatekey('none',16)}.gmail.com`;
  var area       = lib.mysql.getRandomCity([]);
  var year       = (1970 + random.int(0,30)).toString();
  var month      = random.int(1,12).toString();
  var day        = random.int(1,28).toString();
  var gender     = (random.int(0,1) == 0)? '남':'여';
  var os         = (random.int(0,1) == 0)? '안드로이드':'아이폰';
  var registered = Math.floor(Date.now()/1000 - random.int(24*3600*90, 24*3600));
  //var registered = mement(Date.now()).format('YYYY-MM-DD HH:mm:ss');
  var registered = moment(Date.now() - random.int(24*3600, 24*3600*90)*1000).format('YYYY-MM-DD HH:mm:ss');
  console.log(email, area, year, month, day, gender, os, registered);
  var record = [email, 'passw0rd', os, year, month, day, gender, area.sido_nm, area.sigungu_nm, registered];
  lib.mysql.query("INSERT INTO sample_users (email, passwd, os, birth_year, birth_month, birth_day, gender, area1, area2, registered) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", record);
}

function insUsers () {
  var email      = `${lib.utils.generatekey('none',16)}.gmail.com`;
  var area       = lib.mysql.getRandomCity([]);
  var year       = (1970 + random.int(0,30)).toString();
  var month      = random.int(1,12).toString();
  var day        = random.int(1,28).toString();
  var gender     = (random.int(0,1) == 0)? '남':'여';
  var os         = (random.int(0,1) == 0)? '안드로이드':'아이폰';
  var registered = moment(Date.now() - random.int(24*3600, 24*3600*90)*1000).format('YYYY-MM-DD HH:mm:ss');
  console.log(email, area, year, month, day, gender, os, registered);
  var record = [email, 'passw0rd', os, year, month, day, gender, area.sido_nm, area.sigungu_nm, registered, 'A'];
  lib.mysql.query("INSERT INTO users (email, passwd, os, birth_year, birth_month, birth_day, gender, area1, area2, registered, manual) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", record);

  var record = [email, registered, "가입", "프로필", 'A'];
  lib.mysql.query("INSERT INTO admin_users_history (email, updated, done, division, manual) VALUES (?, ?, ?, ?, ?)", record);
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function insReadCsv () {
  console.log("cbReadCsv");
  let input = fs.createReadStream(__dirname + '/../public/food.csv')
    .pipe(new auto({ defaultEncoding: 'euc-kr' }));
  input
    .pipe(new csv({ parseNumbers: true, parseBooleans: true, trim: true }))
    .on('data', function (row) {
        if(row[0] != "키") {
        var record = [row[4], row[2], row[3], "음식점", row[6], row[7]];
        lib.mysql.query("INSERT INTO food_store (name, bzcond, bztype, bzname, area1, area2) VALUES (?, ?, ?, ?, ?, ?)", record);
        console.log('A row arrived: ', row);
        }
    })
    .on('end', function (data) {
        console.log('No more rows!');
    });
}

function updReadCsv () {
  var result = (lib.mysql.query("select * from food_store where addr = '' order by rand() limit 1", []))[0];
  if(result != null) {
  console.log (result);
  lib.google.getGeocode(result.area1 + " " + result.area2 + " " + result.name).catch(err => console.log(err)).then(res => {
    var lat  = res[0].latitude;
    var lng  = res[0].longitude;
    var addr = res[0].formattedAddress;
    addr = addr.replace(/대한민국 /gi, '')
    console.log (lat, lng, addr);
    var record = [lat, lng, addr, result.id];
    lib.mysql.query("UPDATE food_store SET lat = ?, lng = ?, addr = ? WHERE ID = ?", record);
  });
  }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var cbCounter = 0;

function initData () {
  if(cbCounter <= 1) {
    for(var i = 0; i < 5000; i++) {
      insUsers ();
    }
  }
}

function runUsersEvent () {
  var result = (lib.mysql.query("select * from sample_users where used = 'N' order by rand() limit 1", []))[0];
  console.log (result);
  var json = {
    email  : result.email,
    passwd : result.passwd,
    year   : result.birth_year,
    month  : result.birth_month,
    day    : result.birth_day,
    gender : result.gender,
    area1  : result.area1,
    area2  : result.area2,
  }
  lib.utils.postJSON('/sign-up', json).catch(err => console.log('err', err)).then(function (res) {
    var token = res.data.data.token;
    lib.utils.getJSON(`/sign-up/confirm/${json.email}/${token}`, json).catch(err => console.log('err', err)).then(function (res) {
      console.log (res.data);
      lib.mysql.query("update sample_users set used = 'Y' where email = ?", [json.email]);
      
    });
  });
}

function runMemberEvent () {
  var result = (lib.mysql.query("select * from food_store where used = 'N' order by rand() limit 1", []))[0];
  console.log (result);

  var json = {
    register : '관리자',
    rcn      : `${lib.utils.generatekey('digits',3)}-${lib.utils.generatekey('digits',2)}-${lib.utils.generatekey('digits',5)}`,
    password1: 'passw0rd',
    name     : result.name,
    owner    : '홀길동',
    bzcond   : result.bzcond,
    bztype   : result.bztype,
    bzname   : result.bzname,
    phone    : '02-1234-5678',
    date1    : '2010-01-01',
    area1    : result.area1,
    area2    : result.area2,
    addr     : result.addr,
    lat      : result.lat,
    lng      : result.lng
  }
  lib.utils.postJSON('/json/admin/member/register', json).catch(err => console.log('err', err)).then(function (res) {
    lib.mysql.query("update food_store set used = 'Y' where id = ?", [result.id]);
    //var token = res.data.data.token;
/*
    lib.utils.getJSON(`/sign-up/confirm/${json.email}/${token}`, json).catch(err => console.log('err', err)).then(function (res) {
      console.log (res.data);
      lib.mysql.query("update sample_users set used = 'Y' where email = ?", [json.email]);

    });
*/
  });
}

function initMember () {
  while(1) {
  var result = (lib.mysql.query("select * from food_store where used = 'N' order by rand() limit 1", []))[0];
  if(result == null) return;
  console.log (result);

  var register = '관리자';
  var rcn      = `${lib.utils.generatekey('digits',3)}-${lib.utils.generatekey('digits',2)}-${lib.utils.generatekey('digits',5)}`;
  var passwd   = 'passw0rd';
  var name     = result.name;
  var owner    = '홀길동';
  var bzcond   = result.bzcond;
  var bztype   = result.bztype;
  var bzname   = result.bzname;
  var phone    = '02-1234-5678';
  var opening  = '2010-01-01';
  var area1    = result.area1;
  var area2    = result.area2;
  var addr     = result.addr;
  var lat      = result.lat;
  var lng      = result.lng;
  var manual   = 'A';
  var registered = moment(Date.now() - random.int(24*3600, 24*3600*90)*1000).format('YYYY-MM-DD HH:mm:ss');

  var record = [rcn, passwd, name, owner, bzcond, bztype, bzname, phone, opening, area1, area2, addr, lat, lng, register, registered, manual];
  lib.mysql.query("INSERT INTO admin_member (rcn, passwd, name, owner, bzcond, bztype, bzname, phone, opening, area1, area2, address, lat, lng, register, registered, manual) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", record);
  lib.mysql.query("update food_store set used = 'Y' where id = ?", [result.id]);
  }
}

function migrationReceipts () {
  var result = lib.mysql.query("select * from receipt", []);
  console.log (result);
  result.forEach(element => {
    console.log(element);
    var res = lib.mysql.searchCouponRcn ([element.register]);
    var n_promotion  = 0;
    var n_reward     = 0;
    var n_stamp      = 0;
    var c_promotion  = 0;
    var c_reward     = 0;
    var cpurl        = "";
    var rid          = lib.mysql.getTableAutoInc(['receipts']);
    var registered   = moment(element.ts).format('YYYY-MM-DD HH:mm:ss');
    if (res != null) {
      res.forEach(e => {
        switch(e.ctype) {
        case '프로모션': if(element.total >= e.cash) { n_promotion = 1; c_promotion = 1; cpurl = `/publish/coupon/${e.rcn}/${rid}`; } break;
        case '리워드'  : n_reward = 1; c_reward = 1; cpurl = `/publish/coupon/${e.rcn}/${rid}`; break;
        case '스탬프'  : n_stamp  = parseInt(element.total/e.limits); break;
        }
      });
    }
    var record = [element.email, element.name, element.register, element.text.replace(/https\:\/\/tric.kr/gi, ''), element.pdf.replace(/https\:\/\/tric.kr/gi, ''), '현금', element.total, n_promotion, n_reward, n_stamp, c_promotion, c_reward, cpurl, registered];
    console.log (record);
    lib.mysql.query("INSERT INTO receipts (email, member, rcn, text, pdf, payment, amount, n_promotion, n_reward, n_stamp, c_promotion, c_reward, cpurl, registered) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)", record);
  });
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// SIMULATION
//
function cbFunc () {
  cbCounter = cbCounter + 1;
  //if(cbCounter <= 1) initData ();
  //if((cbCounter % 5) == 0) runUsersEvent ();
  //runMemberEvent ();
  //if(cbCounter <= 1) initMember ();
  //if(cbCounter <= 1) migrationReceipts ();
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = function (app) {
  let dotenv  = require('dotenv').config({ path: require('find-config')('.env') })
  let lib     = require('../lib');
  let router  = require('.');
  let cron    = require('node-cron');
  let verbose = true;

  cron.schedule('0 0 * * *', () => {
    console.log('running a task every day');
  });

  /////////////////////////////////////////////////////
  lib.passport.setup (app);

  lib.upload   (app);
  lib.qrcode   (app);
  lib.receipts (app);

  lib.mysql.connect (process.env.DB_HOSTNAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, process.env.DB_DATABASE, verbose);

  /////////////////////////////////////////////////////
  app.get('/', lib.passport.ensureAuthenticated, function (req, res, next) {
    console.log (req.session.passport.user);
    res.render('admin', {user: req.session.passport.user, page: router.page.getPage('/admin')});
  });
  app.get('/admin', lib.passport.ensureAuthenticated, function (req, res, next) {
    res.render('admin', {user: req.session.passport.user, page: router.page.getPage('/admin')});
  });
  app.get('/admin/profile', lib.passport.ensureAuthenticated, function (req, res, next) {
    res.render('admin', {user: req.session.passport.user, page: router.page.getPage('/admin/profile')});
  });
  app.get('/admin/dashboard/member', lib.passport.ensureAuthenticated, function (req, res, next) {
    res.render('admin', {user: req.session.passport.user, page: router.page.getPage('/admin/dashboard/member')});
  });
  app.get('/admin/dashboard/user', lib.passport.ensureAuthenticated, function (req, res, next) {
    res.render('admin', {user: req.session.passport.user, page: router.page.getPage('/admin/dashboard/user')});
  });
  app.get('/admin/dashboard/deal', lib.passport.ensureAuthenticated, function (req, res, next) {
    res.render('admin', {user: req.session.passport.user, page: router.page.getPage('/admin/dashboard/deal')});
  });
  app.get('/admin/dashboard/stamp', lib.passport.ensureAuthenticated, function (req, res, next) {
    res.render('admin', {user: req.session.passport.user, page: router.page.getPage('/admin/dashboard/stamp')});
  });
  app.get('/admin/member/search', lib.passport.ensureAuthenticated, function (req, res, next) {
    res.render('admin', {user: req.session.passport.user, page: router.page.getPage('/admin/member/search')});
  });
  app.get('/admin/member/register', lib.passport.ensureAuthenticated, function (req, res, next) {
    res.render('admin', {user: req.session.passport.user, page: router.page.getPage('/admin/member/register')});
  });
  app.get('/admin/coupon/search', lib.passport.ensureAuthenticated, function (req, res, next) {
    res.render('admin', {user: req.session.passport.user, page: router.page.getPage('/admin/coupon/search')});
  });
  app.get('/admin/coupon/register', lib.passport.ensureAuthenticated, function (req, res, next) {
    res.render('admin', {user: req.session.passport.user, page: router.page.getPage('/admin/coupon/register')});
  });
  app.get('/admin/user/search', lib.passport.ensureAuthenticated, function (req, res, next) {
    res.render('admin', {user: req.session.passport.user, page: router.page.getPage('/admin/user/search')});
  });
  app.get('/admin/user/join', lib.passport.ensureAuthenticated, function (req, res, next) {
    res.render('admin', {user: req.session.passport.user, page: router.page.getPage('/admin/user/join')});
  });
  app.get('/admin/user/age', lib.passport.ensureAuthenticated, function (req, res, next) {
    res.render('admin', {user: req.session.passport.user, page: router.page.getPage('/admin/user/age')});
  });
  app.get('/admin/user/gender', lib.passport.ensureAuthenticated, function (req, res, next) {
    res.render('admin', {user: req.session.passport.user, page: router.page.getPage('/admin/user/gender')});
  });
  app.get('/admin/user/area', lib.passport.ensureAuthenticated, function (req, res, next) {
    res.render('admin', {user: req.session.passport.user, page: router.page.getPage('/admin/user/area')});
  });
  app.get('/admin/event/search', lib.passport.ensureAuthenticated, function (req, res, next) {
    res.render('admin', {user: req.session.passport.user, page: router.page.getPage('/admin/event/search')});
  });
  app.get('/admin/event/register', lib.passport.ensureAuthenticated, function (req, res, next) {
    res.render('admin', {user: req.session.passport.user, page: router.page.getPage('/admin/event/register')});
  });
  app.get('/admin/notice/search', lib.passport.ensureAuthenticated, function (req, res, next) {
    res.render('admin', {user: req.session.passport.user, page: router.page.getPage('/admin/notice/search')});
  });
  app.get('/admin/notice/register', lib.passport.ensureAuthenticated, function (req, res, next) {
    res.render('admin', {user: req.session.passport.user, page: router.page.getPage('/admin/notice/register')});
  });
  app.get('/admin/admin/search', lib.passport.ensureAuthenticated, function (req, res, next) {
    res.render('admin', {user: req.session.passport.user, page: router.page.getPage('/admin/admin/search')});
  });
  app.get('/admin/admin/register', lib.passport.ensureAuthenticated, function (req, res, next) {
    res.render('admin', {user: req.session.passport.user, page: router.page.getPage('/admin/admin/register')});
  });
  app.get('/admin/class/search', lib.passport.ensureAuthenticated, function (req, res, next) {
    res.render('admin', {user: req.session.passport.user, page: router.page.getPage('/admin/class/search')});
  });
  app.get('/admin/class/register', lib.passport.ensureAuthenticated, function (req, res, next) {
    res.render('admin', {user: req.session.passport.user, page: router.page.getPage('/admin/class/register')});
  });
  app.get('/admin/group/search', lib.passport.ensureAuthenticated, function (req, res, next) {
    res.render('admin', {user: req.session.passport.user, page: router.page.getPage('/admin/group/search')});
  });
  app.get('/admin/group/register', lib.passport.ensureAuthenticated, function (req, res, next) {
    res.render('admin', {user: req.session.passport.user, page: router.page.getPage('/admin/group/register')});
  });
  app.get('/admin/role/search', lib.passport.ensureAuthenticated, function (req, res, next) {
    res.render('admin', {user: req.session.passport.user, page: router.page.getPage('/admin/role/search')});
  });

  app.get('/test', lib.passport.ensureAuthenticated, function (req, res, next) {
    res.render('admin', {user: req.session.passport.user, page: router.page.getPage('/test')});
  });
  app.get('/echo', function (req, res, next) {
    lib.response(req, res, 200);
  });
  app.post('/echo', function (req, res, next) {
    lib.response(req, res, 200);
  });

  app.get('/pdf/:f', (req, res) => {
    let f = req.params.f;
    let d = 'pdf';
    let p = `${d}/${f}`;
    let data = require('fs').readFileSync(p);
    res.contentType("application/pdf");
    res.send (data);
  });

  router.member  (app);
  router.admin   (app);
  router.modal   (app);
  router.openapi (app);
  router.json    (app);
  router.miscellaneous (app);

  router.adminlte (app);

  router.websocket.ws (process.env.WS_PORT   || 8081);
  router.grpc.grpc    (process.env.GRPC_PORT || 8082);

  setInterval(cbFunc, 1000)
  return app;
};
