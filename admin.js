'use strict';

const mysql = require('./mysql.js');
const response = require('./response.js');

var pageInfo = {
  title: 'Smart Receipt',
  name:  'Heayeon, Hwang',
  email: 'haeyun@gmail.com',
  page:  ''
}

module.exports = function(app) {
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


  app.get ('/admin/member/search', function(req, res) {
    pageInfo.page ='admin/member/search';
    res.render('pages', pageInfo);
  });
  app.get ('/admin/member/register', function(req, res) {
    pageInfo.page ='admin/member/register';
    res.render('pages', pageInfo);
  });

  //////////////////////////////////////////////////////////////////
  //
  // getJSON
  //
  app.get ('/json/admin/member/search', function(req, res) {
    res.send (mysql.getMember ([]));
  });
}

