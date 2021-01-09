'use strict';

const mysql = require('./mysql.js');
const utils = require('./utils.js');
const response = require('./response.js');

module.exports = function (app) {
  app.get('/qrcode/:email', function(req, res){
    let email = req.params.email;
    let gen   = utils.generateQRcode();

    var result = mysql.delQRcodeEmail ([email]);
    var result = mysql.delIssueEmail  ([email]);
    var result = mysql.putQRcode([email, gen]);
    if(result.affectedRows > 0) return response(req, res, 200, {id: email, qrcode: gen});

    return response(req, res, 409);
  });

  app.get('/issue/:license/:qrcode', function(req, res){
    let license = req.params.license;
    let qrcode  = req.params.qrcode;

    //console.log(qrcode);
    //if(qrcode.indexOf('CP') >= 0) {
    //  ws.send(qrcode);
    //}
    //else if(qrcode.indexOf('QR') >= 0) {
    if(qrcode.indexOf('QR') >= 0) {
      var result = mysql.getQRcodeQRcode([qrcode]);
      if(result.length > 0) {
        let email = result[0].email;

        var result = mysql.delIssueLicense([license]);
        var result = mysql.putIssue([email, license]);
        if(result.affectedRows > 0) return response(req, res, 200);
      }
    }
    return response(req, res, 409);
  });
}
