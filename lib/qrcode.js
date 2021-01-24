'use strict';

module.exports = function (app) {
  const dotenv  = require('dotenv').config({ path: require('find-config')('.env') })
  const router = require('../router');
  const lib = require('.');


  // DEPLICATED
  app.get('/qrcode/:email', function(req, res){
    let email = req.params.email;
    let gen   = lib.utils.generateQRcode();

    var result = lib.mysql.getUserEmail ([email]);
    if(result.length < 1) return lib.response(req, res, 208);
    var id     = result[0].id;

    var result = lib.mysql.delQRcodeEmail ([email]);
    var result = lib.mysql.delIssueEmail  ([email]);
    var result = lib.mysql.putQRcode([email, gen]);
    if(result.affectedRows > 0) return lib.response(req, res, 200, {id: email, qrcode: gen});

    return lib.response(req, res, 409);
  });

  app.post('/qrcode', function(req, res){
    let email = req.body.email;
    if (email == undefined) return lib.response(req, res, 404);

    var result = lib.mysql.getUserEmail ([email]);
    if(result.length < 1) return lib.response(req, res, 208);
    var id     = result[0].id;

    let gen   = lib.utils.generateQRcode(id);

    var result = lib.mysql.delQRcodeEmail ([email]);
    var result = lib.mysql.delIssueEmail  ([email]);
    var result = lib.mysql.putQRcode([email, gen]);
    if(result.affectedRows > 0) return lib.response(req, res, 200, {id: email, qrcode: gen});

    return lib.response(req, res, 409);
  });


  app.get('/issue/:license/:qrcode', function(req, res){
    let license = req.params.license;
    let qrcode  = req.params.qrcode;

    if(qrcode.indexOf('CP') >= 0) {
      router.websocket.wsend(license, `'Command': 'Callback', 'Message': ${process.env.SERVER}/alert/coupon/${qrcode} }`);
      return lib.response(req, res, 200);
    }
    else if(qrcode.indexOf('QR') >= 0) {
      var result = lib.mysql.getQRcodeQRcode([qrcode]);
      if(result.length > 0) {
        let email = result[0].email;

        var result = lib.mysql.delIssueLicense([license]);
        var result = lib.mysql.putIssue([email, license]);
        if(result.affectedRows > 0) return lib.response(req, res, 200);
      }
    }
    return lib.response(req, res, 409);
  });
}
