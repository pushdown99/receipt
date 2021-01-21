'use strict';

const lib = require('.');

module.exports = function (app) {
  // DEPLICATED
  app.get('/qrcode/:email', function(req, res){
    let email = req.params.email;
    let gen   = lib.utils.generateQRcode();

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

    let gen   = lib.utils.generateQRcode();

    var result = lib.mysql.delQRcodeEmail ([email]);
    var result = lib.mysql.delIssueEmail  ([email]);
    var result = lib.mysql.putQRcode([email, gen]);
    if(result.affectedRows > 0) return lib.response(req, res, 200, {id: email, qrcode: gen});

    return lib.response(req, res, 409);
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
