'use strict';

const dotenv = require('dotenv').config()
const moment = require('moment-timezone');

const mysql  = require('./mysql.js');
const utils  = require('./utils.js');

function putReceipt (data) {
  let name     = data.name;
  let register = data.register;
  let tel      = data.tel;
  let address  = data.address;
  let url_txt  = data.url_txt = process.env.SERVER + '/' + data.t;
  let url_pdf  = data.url_pdf = process.env.SERVER + '/' + data.p;
  let url_cpn  = data.url_cpn = process.env.SERVER + '/store/' + data.pos;
  let total    = data.total = utils.toInt(data.total);
  let cash     = data.cash = utils.toInt(data.cash);
  let card     = data.card = utils.toInt(data.card);
  let dt       = data.date;
  let email    = data.email;

  let result = mysql.putReceipt([email, name, register, tel, address, url_txt, url_pdf, total, cash, card, dt]);

  return data;
}

module.exports = function(app) {
  const pdf      = require('./pdf.js');
  const escp     = require('./escp.js');
  const parser   = require('./parser.js');
  const response = require('./response.js');

  app.post('/receipt/:pos', function (req, res) {
    let pos = req.params.pos;
    let dat = escp(req.body.Data);

    var result = mysql.getIssueLicense ([pos]);
    if(result.length < 1) return response(req, res, 404);

    let email  = result[0].email;

    var result = mysql.getUserEmail ([email]);
    if(result.length < 1) return response(req, res, 404);

    let fcmkey = result[0].fcmkey;

    let n = utils.generatekey();
    let p = `pdf/${n}.pdf`;
    let t = `txt/${n}.txt`;

    utils.write(t, dat);
    pdf (p, dat);

    parser (dat, function (err, data) {
      if(err) return response(req, res, 500);
      data.t = t;
      data.p = p;
      data.pos = pos;
      data.email = email;

      data = putReceipt (data, p, t, pos);
      console.log (data);
      var result = mysql.putFcm ([data.email, data.name, data.total, data.date, data.url_pdf, data.url_txt, data.url_cpn]);
      console.log (result);
      utils.sendFcm (process.env.KEY_FCM, fcmkey, process.env.SERVER + '/fcm/' + result.insertId);
      var result = mysql.delIssueEmail  ([email]);
    });
  });

  app.get('/fcm/:id', (req, res) => {
    let id = req.params.id;

    let result = mysql.getFcmId ([id]);
    res.contentType("application/json")
    res.send(JSON.stringify(result));
  });

  app.get('/pdf/:f', (req, res) => {
    let f = req.params.f;
    let d = 'pdf';
    let p = `${d}/${f}`;
    let data = require('fs').readFileSync(p);
    res.contentType("application/pdf");
    res.send (data);
    //res.download (p);
  });

  app.get('/store/:pos', function(req, res){
    var pos   = req.params.pos;
    var result = mysql.getStoreLicense ([pos]);
    if(result.length < 1) return response(req, res, 404);

    var register = result[0].register;
    var result = mysql.getGroupCouponRegister([register]);
    if(result.length > 0) result[0].generate = process.env.SERVER + '/publish/coupon/' + register + '/'
    res.contentType("application/json")
    res.send(JSON.stringify(result));
  });

  app.get('/publish/coupon/:register/:email', function(req, res){
    let register  = req.params.register;
    let email     = req.params.email;

    var result = mysql.getGroupCouponRegister ([register]);
    if(result.length < 1) return response(req, res, 404);
    var id       = result[0].id;
    var name     = result[0].name;
    var title    = result[0].title;
    var genre    = result[0].genre;
    var begins   = moment(result[0].begins).format("YYYY-MM-DD HH:mm:ss");
    var ends     = moment(result[0].ends).format("YYYY-MM-DD HH:mm:ss");

    var result = mysql.putCoupon([email, utils.generateCoupon(), 0, id, name, register, title, genre, begins, ends]);
    var result = mysql.getCouponId([result.insertId]);
    res.contentType("application/json")
    res.send(JSON.stringify(result));
  });

  app.get('/coupon', function(req, res){
    let result = mysql.getCoupon([]);

    res.contentType("application/json")
    res.send(JSON.stringify(result));
  });

  app.get('/coupon/:email', function(req, res){
    let email   = req.params.email;
    let result = mysql.getCouponEmail([email]);

    res.contentType("application/json")
    res.send(JSON.stringify(result));
  });

  app.get('/coupon/:license', function(req, res){
    let license   = req.params.license;
    var result = mysql.getStoreLicense ([license]);
    if(result.length < 1) return response(req, res, 404);

    let register = result[0].register;
    var result = mysql.getGroupCouponRegister([register]);
    if(result.length > 0) result[0].generate = process.env.SERVER + '/publish/coupon/' + register + '/'

    res.contentType("application/json")
    res.send(JSON.stringify(result));
  });

}

