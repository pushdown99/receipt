'use strict';

const lib = require('../lib');

function getMemberInfo () {
  var m = {};

  m.id   = 'aaa@gmail.com';
  m.user = '황해연';
  m.name = '광명설렁탕';

  return m;
}

const URL_MEMBER_SEARCH          = '/admin/member/search'
const URL_MEMBER_REGISTER        = '/admin/member/register'
const URL_MEMBER_USER_SEARCH     = '/admin/member/user/search'
const URL_MEMBER_USER_REGISTER   = '/admin/member/user/register'
const URL_MEMBER_COUPON_SEARCH   = '/admin/member/coupon/search'
const URL_MEMBER_COUPON_REGISTER = '/admin/member/coupon/register'

function getPageInfo (d) {
  var p = {}
 
  switch (d) {
  case URL_MEMBER_SEARCH:
    p.navigation = 'member/search';
    p.title      = '가맹점 조회';
    p.name       = d;
    break;
  case URL_MEMBER_REGISTER:
    p.navigation = 'member/register';
    p.title      = '가맹점 등록';
    p.name       = d;
    break;
  case URL_MEMBER_USER_SEARCH:
    p.navigation = 'member/user/search';
    p.title      = '관리자 조회';
    p.name       = d;
    break;
  case URL_MEMBER_USER_REGISTER:
    p.navigation = 'member/user/register';
    p.title      = '관리자 등록';
    p.name       = d;
    break;
  case URL_MEMBER_COUPON_SEARCH:
    p.navigation = 'member/coupon/search';
    p.title      = '가맹점 쿠폰 조회';
    p.name       = d;
    break;
  case URL_MEMBER_COUPON_REGISTER:
    p.navigation = 'member/coupon/register';
    p.title      = '가맹점 쿠폰 등록';
    p.name       = d;
    break;
  }
  return p;
}

module.exports = function(app) {
  app.get("/login", function (req, res) {
    res.render('login');
  });
  app.get("/register", function (req, res) {
    res.render('register');
  });

  app.get("/admin/login", function (req, res) {
    res.render('login');
  });
  app.get("/admin/register", function (req, res) {
    res.render('register');
  });
  app.get("/admin/forgot-password", function (req, res) {
    res.render('forgot-password');
  });
  app.post("/admin/recover-password", function (req, res) {
    res.render('recover-password');
  });


/*
  app.get (URL_MEMBER_SEARCH, function(req, res) {
    res.render('pages', {member: getMemberInfo(), page: getPageInfo(URL_MEMBER_SEARCH)});
  });
  app.get (URL_MEMBER_REGISTER, function(req, res) {
    res.render('pages', {member: getMemberInfo(), page: getPageInfo(URL_MEMBER_REGISTER)});
  });

  app.get (URL_MEMBER_USER_SEARCH, function(req, res) {
    res.render('pages', {member: getMemberInfo(), page: getPageInfo(URL_MEMBER_USER_SEARCH)});
  });
  app.get (URL_MEMBER_USER_REGISTER, function(req, res) {
    res.render('pages', {member: getMemberInfo(), page: getPageInfo(URL_MEMBER_USER_REGISTER)});
  });

  app.get (URL_MEMBER_COUPON_SEARCH, function(req, res) {
    res.render('pages', {member: getMemberInfo(), page: getPageInfo(URL_MEMBER_COUPON_SEARCH)});
  });
  app.get (URL_MEMBER_COUPON_REGISTER, function(req, res) {
    res.render('pages', {member: getMemberInfo(), page: getPageInfo(URL_MEMBER_COUPON_REGISTER)});
  });

  //////////////////////////////////////////////////////////////////
  //
  // getJSON
  //
  app.get ('/json/admin/member/search', function(req, res) {
    res.send (lib.mysql.getMember ([]));
  });
*/
}

