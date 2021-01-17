module.exports = function (app) {
  let lib     = require('../lib');
  let router  = require('.');
  let verbose = true;

  app.get ('/qrscan', function(req, res) {
    res.render ('qrscan');
  });

  return app;
};
