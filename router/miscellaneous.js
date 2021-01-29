module.exports = function (app) {
  let lib     = require('../lib');
  let router  = require('.');
  let verbose = true;

  app.get ('/qrscan', function(req, res) {
    res.render ('qrscan', { License: '1234' });
  });

  app.get ('/qrscan/:License', function(req, res) {
   let License = req.params.License;
    res.render ('qrscan', { License: License });
  });

  return app;
};
