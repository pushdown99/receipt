'use strict';

module.exports = function (app) {
  let dotenv  = require('dotenv').config({ path: require('find-config')('.env') })
  let lib     = require('../lib');
  let router  = require('.');
  let verbose = true;

  app.get('/member', lib.passport.ensureAuthenticated, function (req, res, next) {
    console.log (router.page.getPage('/member'));
    res.render('member', {page: router.page.getPage('/member')});
  });
  app.get('/member/coupon/search', lib.passport.ensureAuthenticated, function (req, res, next) {
    console.log (router.page.getPage('/member/coupon/search'));
    res.render('member', {page: router.page.getPage('/member/coupon/search')});
  });
  app.get('/member/coupon/register', lib.passport.ensureAuthenticated, function (req, res, next) {
    console.log (router.page.getPage('/member/coupon/register'));
    res.render('member', {page: router.page.getPage('/member/coupon/register')});
  });
  app.get('/member/stamp/search', lib.passport.ensureAuthenticated, function (req, res, next) {
    console.log (router.page.getPage('/member/stamp/search'));
    res.render('member', {page: router.page.getPage('/member/stamp/search')});
  });
  app.get('/member/event/search', lib.passport.ensureAuthenticated, function (req, res, next) {
    console.log (router.page.getPage('/member/event/search'));
    res.render('member', {page: router.page.getPage('/member/event/search')});
  });
  app.get('/member/profile', lib.passport.ensureAuthenticated, function (req, res, next) {
    console.log (router.page.getPage('/member/profile'));
    res.render('member', {page: router.page.getPage('/member/profile')});
  });
};
