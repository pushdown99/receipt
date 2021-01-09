'use strict';

const mysql = require('./mysql.js');
const response = require('./response.js');

module.exports = function(app) {

  // SIGN-IN
  app.post("/sign-in", function (req, res) {
    let email  = req.body.id;
    let passwd = req.body.pwd;
    let fcmkey = req.body.key;

    if (email == undefined || passwd == undefined || fcmkey == undefined) return response(req, res, 404);

    var result = mysql.getUserEmailPass ([email, passwd]);
    if(result.length < 1) return response(req, res, 400);

    var result = mysql.updUser([fcmkey, email]);
    if(result.affectedRows > 0) return response(req, res, 200);

    return response(req, res, 409);
  });

  // SIGN-UP
  app.post('/sign-up/', function(req, res) {
    let email  = req.body.id;
    let passwd = req.body.pwd;

    if(email == undefined || passwd == undefined) return response(req, res, 404);

    var result = mysql.getUserEmail ([email]);
    if(result.length > 0) return response(req, res, 208);

    var result = mysql.putUser([email, passwd]);
    if(result.affectedRows > 0) return response(req, res, 200);

    return response(req, res, 409);
  });

}

