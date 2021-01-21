'use strict';

module.exports = function (app) {
  let dotenv  = require('dotenv').config({ path: require('find-config')('.env') })
  let lib     = require('../lib');
  let router  = require('.');
  let verbose = true;

  app.get('/modal/test', lib.passport.ensureAuthenticated, function (req, res, next) {
    res.render('modal', {page: router.page.getPage('/modal/test')})
  });
};
