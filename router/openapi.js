'use strict';

const lib = require('../lib');

module.exports = function(app) {

  // SIGN-IN
  app.post("/sign-in", function (req, res) {
    let email  = req.body.id;
    let passwd = req.body.pwd;
    let fcmkey = req.body.key;

    if (email == undefined || passwd == undefined || fcmkey == undefined) return lib.response(req, res, 404);

    var result = lib.mysql.getUserEmailPass ([email, passwd]);
    if(result.length < 1) return lib.response(req, res, 400);

    var result = lib.mysql.updUser([fcmkey, email]);
    if(result.affectedRows > 0) return lib.response(req, res, 200);

    return lib.response(req, res, 409);
  });

  // SIGN-UP
  app.post('/sign-up/', function(req, res) {
    let email  = req.body.id;
    let passwd = req.body.pwd;

    if(email == undefined || passwd == undefined) return lib.response(req, res, 404);

    var result = lib.mysql.getUserEmail ([email]);
    if(result.length > 0) return lib.response(req, res, 208);

    var result = lib.mysql.putUser([email, passwd]);
    if(result.affectedRows > 0) return lib.response(req, res, 200);

    return lib.response(req, res, 409);
  });

}

