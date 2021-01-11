'use strict';

const formdata = require('form-data');
const request  = require('request');
const dotenv   = require('dotenv').config();
const verbose  = ((process.env.VERBOSE || 'false') == 'true')

const utils = require('./utils.js');
const mysql = require('./mysql.js');

const middleware = require('./middleware.js');
const login = require('./login.js');
const admin  = require('./admin.js');
const upload = require('./upload.js');
const qrcode = require('./qrcode.js');
const receipts = require('./receipts.js');
const response = require('./response.js');


var pageInfo = {
  title: 'Smart Receiot',
  name:  'Heayeon, Hwang',
  email: 'haeyun@gmail.com',
  page:  ''
}


let wclients = [];
let gclients = [];

module.exports = {
  /////////////////////////////////////////////////////////////////
  //
  // express/route
  // 
  init: function () {
    let express  = require('express');
    let partials = require('express-partials');
    let app      = express();

    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.engine('html', require('ejs').renderFile);

    app.use(partials());
    //app.use(express.favicon());
    //app.use(express.logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true}));
    //app.use(express.methodOverride());
    //app.use(app.router);
    app.use(express.static(__dirname + '/public'));
    //app.use(express.static(__dirname + '/node_modules/admin-lte'));

    utils.logOpen ("hancom.log", "logs");
    mysql.connect (process.env.DB_HOSTNAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, process.env.DB_DATABASE, verbose);

    this.ws (process.env.WS_PORT || 8081);
    this.grpc (process.env.GRPC_PORT || 8082);

    /////////////////////////////////////////////////////////////////////
    if(verbose) middleware (app, true);
    login (app);
    admin (app);
    upload (app);
    qrcode (app);
    receipts (app);

    app.get ('/loopback', function(req, res) {
      res.send ('[loopback]');
    });

    app.get('/qrcode-generator/:text', function(req, res) {
      const text   = req.params.text;
      const qrcode = require('qrcode').toDataURL(text, function (e, d) {
        //res.send ('<img src="' + d + '"/>');
        res.send (d);
      });
    });

    ///////////////////////////////////////////////////////////////

    app.get('/mailto/:to', function(req, res) {
      const From    = process.env.MAIL_USERNAME;
      const Pass    = process.env.MAIL_PASSWORD;
      const To      = req.params.to;
      const Subject = 'Sending Email using Node.js'
      const Text    = 'That was easy!';

      utils.mailto(From, Pass, To, Subject, Text, function (error, info) {
        if(info) console.log('Email sent: ' + info.response);
      });
/*
      const Mail = require('nodemailer');

      let Send = Mail.createTransport({
        service: 'naver',
        host: 'smtp.naver.com',
        port: 587,
        auth: { user: From, pass: Pass, }
      });
      let Opts = {
        from: From,
        to: To,
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
      };

      Send.sendMail(Opts, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
*/
      res.send("");
    });

    app.get('/sms/:to', function(req, res) {
      const to      = req.params.to;
      utils.sms(to, 'hi');
      res.send("");
    });
 

    ///////////////////////////////////////////////////////////////

    app.get ('/', function(req, res) {
      pageInfo.page ='member_coupon';
      res.render('page', pageInfo);
    });
    app.get ('/utils/juso/:keyword', function(req, res) {
       let keyword = req.params.keyword;

       let formData = {
         currentPage: 1,
         countPerPage: 100,
         keyword: keyword,
         confmKey: 'devU01TX0FVVEgyMDIxMDExMDE0MDQzNzExMDY0ODU=',
         resultType: 'json',
       };
 
       request.post({url:'https://www.juso.go.kr/addrlink/addrLinkApiJsonp.do', formData: formData}, function(err, httpResponse, body) {
         if (err) {
           return console.error('upload failed:', err);
         }
         //let data = body.replace(/()/g, "");
         //console.log (data);
         //var  obj = JSON.parse(data);
         //console.log('Upload successful!  Server responded with:', obj);
         body = body.replace(/[()]+/gi,"");
         let obj = JSON.parse(body);
         res.send (body);
       });

    });
    app.get ('/test', function(req, res) {
      res.render('pages/test');
    });
    app.get ('/member', function(req, res) {
      res.render('pages/member');
    });
    app.get ('/v1', function(req, res) {
      res.render('v1');
    });
    app.get ('/v2', function(req, res) {
      res.render('v2');
    });
    app.get ('/v3', function(req, res) {
      res.render('v3');
    });
    app.get ('/starter', function(req, res) {
      res.render('starter');
    });

    app.get ('/password', function(req, res) {
      let result = utils.genPassHash ('1234567890'); 

      res.send (result);
    });

    app.get ('/qrscan', function(req, res) {
      res.render ('qrscan');
    });

    app.get ('/generate', function(req, res) {
      let key = utils.generatekey();
      console.log(key);
      res.send(key);
    });

    app.get ('/admin/member/get-coupon', function(req, res) {
      res.send (mysql.getGroupCoupon([]));
    });
    app.get ('/receipts', function(req, res) {
      res.send (mysql.getReceipts([]));
    });

    app.get ('/download/:p/:f', function(req, res) {
      const p = req.params.p;
      const f = req.params.f;
      var obj = utils.download({path: p, file: f, res: res}, function(data) {
        res.send(data);
      });
    });


    return app;
  },

  /////////////////////////////////////////////////////////////////
  //
  // websocket
  // 
  ws: function (port) {
    const websocket = require('ws')
    const wss = new websocket.Server({ port: port });

    console.log('Listener: ', 'wsock listening on port ' + port);

    wss.on('connection', function connection(ws) {
      wclients.push(ws);

      ws.on('open', function open() {
        console.log('open');
        ws.send('something');
      });

      ws.on('message', function incoming(data) {
        console.log(data.toString());
        ws.send('something');
      });
    });
  },

  wsend: function (message) {
    for (var n=0; n < wclients.length; n++) {
        wclients[n].send(message);
    }
  },

  /////////////////////////////////////////////////////////////////
  //
  // gRPC
  // 
  grpc: function (port) {
    const grpc = require("grpc");
    const protoLoader = require("@grpc/proto-loader");

    const server  = new grpc.Server();
    const address = "0.0.0.0:" + port;

    console.log('Listener: ', 'grpc  listening on port ' + port);

    let proto = grpc.loadPackageDefinition(
        protoLoader.loadSync(__dirname + "/protos/chat.proto", {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
      })
    );

    server.addService(proto.example.Chat.service, { join: this.gjoin, send: this.gsend });
    server.bind(address, grpc.ServerCredentials.createInsecure());
    server.start();
  },

  gjoin: function (call, callback) {
    gclients.push(call);
    this.gnotify({ user: "Server", text: "new user joined ..." });
  },

  gsend: function (call, callback) { 
    this.gnotify(call.request); 
  },

  gnotify: function (message) {
    gclients.forEach(client => { client.write(message); }); 
  },

  /////////////////////////////////////////////////////////////////
  //
  // AWS
  // 
  awsiot: function () {
    const awsIot = require('aws-iot-device-sdk');

    var device = awsIot.device({
       keyPath: "/etc/amazon/things-private.pem.key",
      certPath: "/etc/amazon/things.pem.crt",
        caPath: "/etc/amazon/root.pem",
      clientId: "arn:aws:iot:ap-northeast-2:081710662021:thing/my-iot-node",
          host: "a1v57gl7w78wlt-ats.iot.ap-northeast-2.amazonaws.com"
    });

    device
      .on('connect', function() {
        console.log('connect');
        device.subscribe('dt/stm32l475e/sensor-data/topic');
        //device.publish('dt/stm32l475e/sensor-data/topic', JSON.stringify({ test_data: 1}));
      });

    device
      .on('message', function(topic, payload) {
        console.log('message', topic, payload.toString());
      });
  },

}

