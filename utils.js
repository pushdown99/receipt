'use strict';

const rand    = require("random-key");
const fs      = require('fs');
const mail    = require('nodemailer');
const crypto  = require('crypto');
const bcrypt  = require('bcrypt');
const request = require('request');
const fcm     = require('fcm-node');
const path    = require('path');
const winston = require('winston');

let { format: { combine, colorize, timestamp, json }, } = winston;
let logger = null;


module.exports = {
  generatekey: function(type = 'none', length = 32) {
    switch(type) {
    case 'none'  : return rand.generate(length);
    case 'base30': return rand.generateBase30(length);
    case 'digits': return rand.generateDigits(length);
    }
  },

  generateQRcode: function(length = 29, callback=null) {
    return "QR-" + rand.generate(length);
  },

  generateCoupon: function(length = 29, callback=null) {
    return "CP-" + rand.generate(length);
  },

  toInt: function (s) {
    if(s == undefined) return 0;
    return parseInt(s.replace(/\,/g, ''), 10);
  },

  fileexists: function(f, callback = null) {
    fs.exists(f, function(r) {
      callback (r);
    });
  },

  mailto: function(From, Pass, To, Subject, Text, Callback) {
    let Send = mail.createTransport({ service: 'naver', host: 'smtp.naver.com', port: 587, auth: { user: From, pass: Pass, } });
    let Opts = { from: From, to: To, subject: Subject, text: Text };

    Send.sendMail(Opts, function(error, info){
      Callback (error, info);
    });
  },

  signature: function (method, serviceId, accessKey, secretKey) {
    const space     = ' ';
    const newLine   = '\n';
    const message   = [];
    const hmac      = crypto.createHmac('sha256', secretKey);
    const url       = `/sms/v2/services/${serviceId}/messages`;
    const timestamp = Date.now().toString();

    console.log(url);

    message.push(method);
    message.push(space);
    message.push(url);
    message.push(newLine);
    message.push(timestamp);
    message.push(newLine);
    message.push(accessKey);

    return {'timestamp': timestamp, 'signature': hmac.update(message.join('')).digest('base64')};
  },

  sms: async function (to, content, countrycode='82') {
    const accessKey  = process.env.NBP_ACCESS_KEY;
    const secretKey  = process.env.NBP_SECRET_KEY;
    const serviceId  = process.env.SMS_SERVICE_ID;
    const {timestamp, signature}  = this.signature ('POST', serviceId, accessKey, secretKey);
    const url        = `https://sens.apigw.ntruss.com/sms/v2/services/${serviceId}/messages`;

    request({
      method: 'post',
      json: true,
      url: url,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'x-ncp-apigw-timestamp': timestamp,
        'x-ncp-iam-access-key': accessKey,
        'x-ncp-apigw-signature-v2': signature
      },
      body: {
        'type': 'SMS',
        'contentType': 'COMM',
        'countryCode': countrycode,
        'from': '01029368514',
        'content': content,
        'messages': [ { to: `${to}`, }, ],
      },
    },function (err, res, info) {
      if(verbose) console.log (info);
    });
  },

  sendFcm: function(key, to, url) {
    let Fcm = new fcm(key);
    var msg = {
      to: to,
      notification: {
        title: '전지영수증이 발급되었습니다.',
        body: '---'
      },
      data: {
        receipt: url
      }
    };
    Fcm.send(msg, function(e, r){
      if (e) console.log("Something has gone wrong!");
      else   console.log("Successfully sent with response: ", r);
    });
  },

  download: function (f, callback) {
    //let f = __dirname + "/" + obj.path + "/" + obj.file; 
    //let e = obj.file.split('.').pop();
    let e = f.split('.').pop();
    fs.exists(f, (exists) => {
      if(exists) {
         let data = fs.readFileSync(f);
         switch (e) {
         case 'pdf': obj.res.contentType("application/pdf"); break;
         case 'png': obj.res.contentType("image/png");       break;
         }
         callback (data);
      }
    });
  },

  interval: function(t, callback) {
    setInterval(callback, t*1000);
  },

  timeout: function(t, callback, arg=null) {
    setTimeout(callback, t*1000, arg);
  },

  read: function(f) {
    return fs.readFileSync(f);
  },

  write: function(f, data) {
    fs.writeFile(f, data, function (err) {
      if (err) console.log (err);
    });
  },

  logOpen: function (f, d) {
    console.log("open: " + f + ',' + d);
    logger = winston.createLogger({
      level: "info",
      format: combine(timestamp(), json()),
      transports: [
        new winston.transports.File({ filename: f, dirname: d }),
      ],
    });
    return logger;
  },

  logInfo: function (d) {
    console.log("info: " + d);
    logger.info (d);
  },

  genRandomString: function (length){
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0,length);   /** return required number of characters */
  },

  sha256: function (password, salt){
    let hash = crypto.createHmac('sha256', salt);
    hash.update(password);
    let value = hash.digest('hex');
    return {
        salt: salt,
        hash: value
    };
  },

  sha512: function (password, salt){
    let hash = crypto.createHmac('sha512', salt); 
    hash.update(password);
    let value = hash.digest('hex');
    return {
        salt: salt,
        hash: value
    };
  },

  genBlowHash: function (password, rounds = 10) {
    const salt = bcrypt.genSaltSync(rounds);
    const hash = bcrypt.hashSync(password, salt);

    return { salt: salt, password: password, hash: hash };
    
  },

  cmpBlowHash: function (password, hash) {
    return bcrypt.compareSync(password, hash);
  },

  genPassHash: function (password, salt = 'passwordpassword', type = 'sha256') { // salt = '61feacc5ca5ec309'
    //let salt = this.genRandomString(16); 
    let result = {};

    switch(type) {
    case 'sha256': result = this.sha256(password, salt); break;
    case 'sha512': 
    default      : result = this.sha256(password, salt); break;
    }
    return { salt: result.salt, password: password, hash: result.hash };
  },

  cmpPassHash: function (password, hash) {
    return (password == hash);
  },
}

