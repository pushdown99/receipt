'use strict';

let dotenv = require('dotenv').config({ path: require('find-config')('.env') })
let moment = require('moment-timezone');
let lib    = require('.');

function putReceipt (data) {
  let name     = data.name;
  let register = data.register;
  let tel      = data.tel;
  let address  = data.address;
  let url_txt  = data.url_txt = process.env.SERVER + '/' + data.t;
  let url_pdf  = data.url_pdf = process.env.SERVER + '/' + data.p;
  //let url_cpn  = data.url_cpn = process.env.SERVER + '/store/' + data.rcn;
  let url_cpn  = data.url_cpn = process.env.SERVER + '/coupon/find/' + data.register;
  let total    = data.total = lib.utils.toInt(data.total);
  let cash     = data.cash = lib.utils.toInt(data.cash);
  let card     = data.card = lib.utils.toInt(data.card);
  let dt       = data.date;
  let email    = data.email;

  let result = lib.mysql.putReceipt([email, name, register, tel, address, url_txt, url_pdf, total, cash, card, dt]);

  return data;
}

module.exports = function(app) {

  app.post('/receipt/probe/:rcn', function (req, res) {
    let rcn = req.params.rcn;
    let dat = lib.escp(req.body.Data);

console.log (dat);
    var result = lib.mysql.getIssueLicense ([rcn]);
    if(result.length < 1) {
      return res.send(req.body.Data);
      //return response(req, res, 404);
    }

    let email  = result[0].email;

    var result = lib.mysql.getUserEmail ([email]);
    if(result.length < 1) return res.send(req.body.Data);

    let fcmkey = result[0].fcmkey;

    let n = lib.utils.generatekey();
    let p = `pdf/${n}.pdf`;
    let t = `txt/${n}.txt`;

    lib.utils.write(t, dat);
    lib.pdf (p, dat);

    console.log (dat);
    lib.parser (dat, function (err, data) {
      if(err) {
        //return lib.response(req, res, 500);
        return res.send(req.body.Data);
      }
      data.t = t;
      data.p = p;
      //data.rcn = rcn;
      data.email = email;

      //data = putReceipt (data, p, t, rcn);
      data = putReceipt (data);
      console.log (data);
      console.log ([data.email, data.name, data.register, data.total, data.date, data.url_pdf, data.url_txt, data.url_cpn]);
      var result = lib.mysql.putFcm ([data.email, data.name, data.register, data.total, data.date, data.url_pdf, data.url_txt, data.url_cpn]);
      console.log (result);
      lib.utils.sendFcm (process.env.KEY_FCM, fcmkey, process.env.SERVER + '/fcm/' + result.insertId);
      var result = lib.mysql.delIssueEmail  ([email]);

      return res.send("");
    });
  });

  app.post('/fcm/:id', (req, res) => {
    let id = req.params.id;

    let result = lib.mysql.getFcmId ([id]);
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

  app.get('/store/:rcn', function(req, res){
    var rcn   = req.params.rcn;
    var result = lib.mysql.getStoreLicense ([rcn]);
    if(result.length < 1) return lib.response(req, res, 404);

    var register = result[0].register;
    var result = lib.mysql.getGroupCouponRegister([register]);
    if(result.length > 0) result[0].generate = process.env.SERVER + '/publish/coupon/' + register + '/'
    res.contentType("application/json")
    res.send(JSON.stringify(result));
  });

  app.get('/publish/coupon/:register/:email', function(req, res){
    let register  = req.params.register;
    let email     = req.params.email;

    var result = lib.mysql.getGroupCouponRegister ([register]);
    if(result.length < 1) return lib.response(req, res, 404);
    var id       = result[0].id;
    var name     = result[0].name;
    var title    = result[0].title;
    var genre    = result[0].genre;
    var begins   = moment(result[0].begins).format("YYYY-MM-DD HH:mm:ss");
    var ends     = moment(result[0].ends).format("YYYY-MM-DD HH:mm:ss");

    var result = lib.mysql.putCoupon([email, lib.utils.generateCoupon(1), 0, id, name, register, title, genre, begins, ends]);
    var result = lib.mysql.getCouponId([result.insertId]);
    res.contentType("application/json")
    res.send(JSON.stringify(result));
  });
}

