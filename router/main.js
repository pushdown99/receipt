'use strict';

module.exports = function (app) {
  let dotenv  = require('dotenv').config({ path: require('find-config')('.env') })
  let lib     = require('../lib');
  let router  = require('.');
  let verbose = true;

  /////////////////////////////////////////////////////
  lib.passport.setup (app);

  lib.upload   (app);
  lib.qrcode   (app);
  lib.receipts (app);

  lib.mysql.connect (process.env.DB_HOSTNAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, process.env.DB_DATABASE, verbose);

  /////////////////////////////////////////////////////
  app.get('/', lib.passport.ensureAuthenticated, function (req, res, next) {
    console.log (router.page.getPage('/admin'));
    res.render('admin', {page: router.page.getPage('/admin')});
  });
  app.get('/admin', lib.passport.ensureAuthenticated, function (req, res, next) {
    console.log (router.page.getPage('/admin'));
    res.render('admin', {page: router.page.getPage('/admin')});
  });
  app.get('/admin/profile', lib.passport.ensureAuthenticated, function (req, res, next) {
    console.log (router.page.getPage('/admin/profile'));
    res.render('admin', {page: router.page.getPage('/admin/profile')});
  });
  app.get('/admin/member/search', lib.passport.ensureAuthenticated, function (req, res, next) {
    console.log (router.page.getPage('/admin/member/search'));
    res.render('admin', {page: router.page.getPage('/admin/member/search')});
  });
  app.get('/admin/member/register', lib.passport.ensureAuthenticated, function (req, res, next) {
    console.log (router.page.getPage('/admin/member/register'));
    res.render('admin', {page: router.page.getPage('/admin/member/register')});
  });
  app.get('/admin/coupon/search', lib.passport.ensureAuthenticated, function (req, res, next) {
    console.log (router.page.getPage('/admin/coupon/search'));
    res.render('admin', {page: router.page.getPage('/admin/coupon/search')});
  });
  app.get('/admin/coupon/register', lib.passport.ensureAuthenticated, function (req, res, next) {
    console.log (router.page.getPage('/admin/coupon/register'));
    res.render('admin', {page: router.page.getPage('/admin/coupon/register')});
  });
  app.get('/admin/user/search', lib.passport.ensureAuthenticated, function (req, res, next) {
    console.log (router.page.getPage('/admin/user/search'));
    res.render('admin', {page: router.page.getPage('/admin/user/search')});
  });
  app.get('/admin/user/join', lib.passport.ensureAuthenticated, function (req, res, next) {
    console.log (router.page.getPage('/admin/user/join'));
    res.render('admin', {page: router.page.getPage('/admin/user/join')});
  });
  app.get('/admin/user/age', lib.passport.ensureAuthenticated, function (req, res, next) {
    console.log (router.page.getPage('/admin/user/age'));
    res.render('admin', {page: router.page.getPage('/admin/user/age')});
  });
  app.get('/admin/user/gender', lib.passport.ensureAuthenticated, function (req, res, next) {
    console.log (router.page.getPage('/admin/user/gender'));
    res.render('admin', {page: router.page.getPage('/admin/user/gender')});
  });
  app.get('/admin/user/area', lib.passport.ensureAuthenticated, function (req, res, next) {
    console.log (router.page.getPage('/admin/user/area'));
    res.render('admin', {page: router.page.getPage('/admin/user/area')});
  });
  app.get('/admin/event/search', lib.passport.ensureAuthenticated, function (req, res, next) {
    console.log (router.page.getPage('/admin/event/search'));
    res.render('admin', {page: router.page.getPage('/admin/event/search')});
  });
  app.get('/admin/event/register', lib.passport.ensureAuthenticated, function (req, res, next) {
    console.log (router.page.getPage('/admin/event/register'));
    res.render('admin', {page: router.page.getPage('/admin/event/register')});
  });
  app.get('/admin/notice/search', lib.passport.ensureAuthenticated, function (req, res, next) {
    console.log (router.page.getPage('/admin/notice/search'));
    res.render('admin', {page: router.page.getPage('/admin/notice/search')});
  });
  app.get('/admin/notice/register', lib.passport.ensureAuthenticated, function (req, res, next) {
    console.log (router.page.getPage('/admin/notice/register'));
    res.render('admin', {page: router.page.getPage('/admin/notice/register')});
  });
  app.get('/admin/admin/search', lib.passport.ensureAuthenticated, function (req, res, next) {
    console.log (router.page.getPage('/admin/admin/search'));
    res.render('admin', {page: router.page.getPage('/admin/admin/search')});
  });
  app.get('/admin/admin/register', lib.passport.ensureAuthenticated, function (req, res, next) {
    console.log (router.page.getPage('/admin/admin/register'));
    res.render('admin', {page: router.page.getPage('/admin/admin/register')});
  });
  app.get('/admin/class/search', lib.passport.ensureAuthenticated, function (req, res, next) {
    console.log (router.page.getPage('/admin/class/search'));
    res.render('admin', {page: router.page.getPage('/admin/class/search')});
  });
  app.get('/admin/class/register', lib.passport.ensureAuthenticated, function (req, res, next) {
    console.log (router.page.getPage('/admin/class/register'));
    res.render('admin', {page: router.page.getPage('/admin/class/register')});
  });
  app.get('/admin/group/search', lib.passport.ensureAuthenticated, function (req, res, next) {
    console.log (router.page.getPage('/admin/group/search'));
    res.render('admin', {page: router.page.getPage('/admin/group/search')});
  });
  app.get('/admin/group/register', lib.passport.ensureAuthenticated, function (req, res, next) {
    console.log (router.page.getPage('/admin/group/register'));
    res.render('admin', {page: router.page.getPage('/admin/group/register')});
  });
  app.get('/admin/grade/search', lib.passport.ensureAuthenticated, function (req, res, next) {
    console.log (router.page.getPage('/admin/grade/search'));
    res.render('admin', {page: router.page.getPage('/admin/grade/search')});
  });

  app.get('/test', lib.passport.ensureAuthenticated, function (req, res, next) {
    console.log (router.page.getPage('/test'));
    res.render('admin', {page: router.page.getPage('/test')});
  });
  app.get('/modal', lib.passport.ensureAuthenticated, function (req, res, next) {
    res.render('modal');
  });
  app.get('/pdf/:f', (req, res) => {
    let f = req.params.f;
    let d = 'pdf';
    let p = `${d}/${f}`;
    let data = require('fs').readFileSync(p);
    res.contentType("application/pdf");
    res.send (data);
  });


  /////////////////////////////////////////////////////
  router.admin   (app);
  router.member  (app);
  router.modal   (app);
  router.openapi (app);
  router.json    (app);
  router.miscellaneous (app);

  router.adminlte (app);

  router.websocket.ws (process.env.WS_PORT   || 8081);
  router.grpc.grpc    (process.env.GRPC_PORT || 8082);

  return app;
};
