'use strict';


module.exports = function(app) {

  app.get ('/adminlte/v1', function(req, res) {
    res.render('adminlte/v1');
  });

  app.get ('/adminlte/index.html', function(req, res) {
    res.render('adminlte/v1');
  });

  app.get ('/adminlte/v2', function(req, res) {
    res.render('adminlte/v2');
  });

  app.get ('/adminlte/index2.html', function(req, res) {
    res.render('adminlte/v2');
  });

  app.get ('/adminlte/v3', function(req, res) {
    res.render('adminlte/v3');
  });

  app.get ('/adminlte/index3.html', function(req, res) {
    res.render('adminlte/v3');
  });

  app.get ('/adminlte/starter', function(req, res) {
    res.render('adminlte/starter');
  });
}

