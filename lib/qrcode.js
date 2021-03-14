'use strict';

module.exports = function (app) {
  const dotenv  = require('dotenv').config({ path: require('find-config')('.env') })
  const router = require('../router');
  const lib = require('.');

  app.post('/qrcode', function(req, res){
    let email  = req.body.email;
    if (email == undefined) return lib.response(req, res, 404);

    var user = null;
    if((user = lib.mysql.searchUsersByEmail ([email])) == null) return lib.response(req, res, 208);

    let gen   = lib.utils.generateQRcode(user.id);
    lib.mysql.delTicketByEmail ([email]);
    var result = lib.mysql.putTicketInit([email, gen]);
    if(result.affectedRows > 0) return lib.response(req, res, 200, {id: email, qrcode: gen});
    return lib.response(req, res, 409);
  });

  app.get('/issue/:license/:code', function(req, res){
    var license = req.params.license;
    var code    = req.params.code;
    var pos     = null;
    var member  = null;
    var ticket  = null;
    var icon    = null;

    if((pos    = lib.mysql.searchPosLicense ([license])) == null) return lib.response(req, res, 208);
    if((member = lib.mysql.searchMemberByRcn([pos.rcn])) == null) return lib.response(req, res, 208);
    if((icon   = lib.mysql.searchMemberIcon([member.bzname])) == null) return lib.response(req, res, 208);

    switch(code.charAt(0)) {
    case 'C':
      var result = lib.mysql.getUserCouponCode([code]);
console.log (result);
      if(result.length > 0) {
        router.websocket.wsend(license, `{"Command": "Callback", "Message": "${process.env.SERVER}/alert/coupon/${code}" }`);
        return lib.response(req, res, 200, {qrcode: code, email: result[0].email, license: license});
      }
      else {
        return lib.response(req, res, 404, {qrcode: code});
      }
      break;
    case 'Q':
    default :
      if((ticket = lib.mysql.searchTicketByCode([code])) == null) return lib.response(req, res, 208,  {qrcode: code, license: license});
      var result = lib.mysql.updTicketByCode ([license, pos.rcn, member.name, member.bzname, member.phone, icon.icon_path, code]);
      return lib.response(req, res, 200, {email: ticket.email, qrcode: code, license: license});
      break;
    }
  });
}
