'use strict';

let lib     = require('../lib');
let router  = require('.');
let random  = require("random");
let moment  = require('moment-timezone');
let iconv   = require('iconv-lite');
  
function cbInsUsers () {
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
  var record = [email, 'xy', os, year, month, day, gender, area.sido_nm, area.sigungu_nm, registered, 'A'];
  lib.mysql.query("INSERT INTO users (email, passwd, os, birth_year, birth_month, birth_day, gender, area1, area2, registered, manual) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", record);

}

var cbCounter = 0;

function cbFunc () {
  cbCounter = cbCounter + 1;
  //if((cbCounter % 1) == 0) cbInsUsers ();
}

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
