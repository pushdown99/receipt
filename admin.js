'use strict';

const mysql = require('./mysql.js');
const response = require('./response.js');

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
}

