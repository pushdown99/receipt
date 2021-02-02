'use strict';

module.exports = function (app) {
  let dotenv  = require('dotenv').config({ path: require('find-config')('.env') })
  let lib     = require('../lib');
  let router  = require('.');
  let verbose = true;

  app.get('/member', lib.passport.ensureAuthenticated, function (req, res, next) {
    res.render('member', {member: req.session.member, user: req.session.passport.user, page: router.page.getPage('/member')});
  });
  app.get('/member/profile', lib.passport.ensureAuthenticated, function (req, res, next) {
    res.render('member', {member: req.session.member, user: req.session.passport.user, page: router.page.getPage('/member/profile')});
  });
  app.get('/member/coupon/search', lib.passport.ensureAuthenticated, function (req, res, next) {
    res.render('member', {member: req.session.member, user: req.session.passport.user, page: router.page.getPage('/member/coupon/search')});
  });
  app.get('/member/coupon/register', lib.passport.ensureAuthenticated, function (req, res, next) {
    res.render('member', {member: req.session.member, user: req.session.passport.user, page: router.page.getPage('/member/coupon/register')});
  });
  app.get('/member/stamp/search', lib.passport.ensureAuthenticated, function (req, res, next) {
    res.render('member', {member: req.session.member, user: req.session.passport.user, page: router.page.getPage('/member/stamp/search')});
  });
  app.get('/member/event/search', lib.passport.ensureAuthenticated, function (req, res, next) {
    res.render('member', {member: req.session.member, user: req.session.passport.user, page: router.page.getPage('/member/event/search')});
  });
  app.get('/member/detail', lib.passport.ensureAuthenticated, function (req, res, next) {
    res.render('member', {member: req.session.member, user: req.session.passport.user, page: router.page.getPage('/member/detail')});
  });
  app.get('/member/:id', lib.passport.ensureAuthenticated, function (req, res, next) {
    req.session.member = lib.mysql.findAdminMemberId ([req.params.id]);
    res.redirect('/member');
  });

};
