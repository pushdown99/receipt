'use strict';

var lib = require('./lib');

module.exports = function () {
  let express  = require('express');
  let partials = require('express-partials');
  let app      = express();

  let moment   = require('moment-timezone');
  let cookie   = require('cookie-parser')

  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.engine('html', require('ejs').renderFile);

  app.use(cookie())
  app.use(partials());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true}));
  app.use(express.static(__dirname + '/public'));
 
  // Middleware
  app.use(function (req, res, next) {
    req.timestamp  = moment().unix(); 
    req.receivedAt = moment().tz('Asia/Seoul').format('YYYY-MM-DD hh:mm:ss');

    switch(req.method) {
    case "GET":  console.log(req.receivedAt, req.protocol.toUpperCase(), req.user, req.method, req.url, req.params); break;
    case "POST": console.log(req.receivedAt, req.protocol.toUpperCase(), req.user, req.method, req.url, req.body);   break;
    } next();
  });

  // Initialize
  lib.upload (app);
  lib.passport (app);

  app.get('/', function (req, res, next) {
    console.log ('/', req.user, req.isAuthenticated());
    res.send('root');
  });
  app.get('/test', function (req, res, next) {
    console.log ('/', req.user, req.isAuthenticated());
    res.send('test');
  });
  app.get('/loop', function (req, res) {
    res.send('loop');
  });

  app.get('/login', function(req, res) {
    res.render('login');
  });

  return app;
};
