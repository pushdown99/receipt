'use strict';

const https   = require('https')
const rand    = require("random-key");
const random  = require("random");
const fs      = require('fs');
const mail    = require('nodemailer');
const crypto  = require('crypto');
const bcrypt  = require('bcrypt');
const request = require('request');
const fcm     = require('fcm-node');
const path    = require('path');
const winston = require('winston');
const moment  = require('moment-timezone');
const iconv   = require('iconv-lite');



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

  generateQRcode: function(id, length = 6, callback=null) {
    return "Q" + this.generatekey('digits', length) + "-" + id;
  },

  generateCoupon: function(id, length = 6, callback=null) {
    return "C" + this.generatekey('digits', length) + "-" +id;
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

  sendFcm: function(key, to, url, callback = null) {
    let Fcm = new fcm(key);
    var msg = {
      to: to,
      notification: {
        title: '전자영수증이 발급되었습니다.',
        body: '---'
      },
      data: {
        receipt: url
      }
    };
    Fcm.send(msg, function(e, r) {
      if(callback != null) {
        if (e) { console.log("Something has gone wrong!"); }
        else   { console.log("Successfully sent with response: ", r); }
        callback (e, r);
      }
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

  sha512: function (password, salt='passwordpassword'){
    //let hash = crypto.createHmac('sha512', salt); 
    //let hash = crypto.createHmac('sha512'); 
    //hash.update(password);
    //let value = hash.digest('hex');
    //return {
    //    salt: salt,
    //    hash: value
    //};
    let hash = crypto.createHash('sha512').update(password).digest('hex');
    return hash;
  },

  genBlowHash: function (password, rounds = 10) {
    const salt = bcrypt.genSaltSync(rounds);
    const hash = bcrypt.hashSync(password, salt);

    return { salt: salt, password: password, hash: hash };
    
  },

  cmpBlowHash: function (password, hash) {
    return bcrypt.compareSync(password, hash);
  },

  genPassHash: function (password, salt = 'passwordpassword', type = 'sha512') { // salt = '61feacc5ca5ec309'
    //let salt = this.genRandomString(16); 
    let result = {};

    switch(type) {
    case 'sha256': result = this.sha256(password, salt); break;
    case 'sha512': 
    default      : result = this.sha512(password, salt); break;
    }
    return { salt: result.salt, password: password, hash: result.hash };
  },

  cmpPassHash: function (password, hash) {
    return (password == hash);
  },

  httpsReuest: function () {
    const data = JSON.stringify({
      todo: 'Buy the milk'
    })
    const options = {
      hostname: 'whatever.com',
      port: 443,
      path: '/todos',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    }
    var req = https.request(options, res => {
      console.log (res);
      res.on('data', d => {
        process.stdout.write(d)
      })
    })
  },

  postJSON: function (url, json) {
    let axios  = require('axios');

    return new Promise((resolve, reject) => {
      axios.post(url, json).catch(err => reject(err)).then(result => resolve(result))
    });
  },

  getJSON: function (url, json) {
    let axios  = require('axios');

    return new Promise((resolve, reject) => {
      axios.get(url, json).catch(err => reject(err)).then(result => resolve(result))
    });
  },

  postCRN: function (crn) {
    let axios  = require('axios');
    let postUrl = "https://teht.hometax.go.kr/wqAction.do?actionId=ATTABZAA001R08&screenId=UTEABAAA13&popupYn=false&realScreenId=";
    let xmlRaw  = "<map id=\"ATTABZAA001R08\"><pubcUserNo/><mobYn>N</mobYn><inqrTrgtClCd>1</inqrTrgtClCd><txprDscmNo>{CRN}</txprDscmNo><dongCode>15</dongCode><psbSearch>Y</psbSearch><map id=\"userReqInfoVO\"/></map>"

    return new Promise((resolve, reject) => {
      axios.post(postUrl, xmlRaw.replace(/\{CRN\}/, crn), { headers: { 'Content-Type': 'text/xml' } })
      .catch(err => reject(err))
      .then(result => {
        this.getCRN (result['data'])
        .catch(err => reject(err))
        .then(CRNumber => resolve(CRNumber))
      })
    });
  },

  getCRN: function (data) {
    let xml2js = require('xml2js');
    return new Promise((resolve, reject) => {
      xml2js.parseString(data, (err, res) => {
        //console.log (res);
        //console.log (res.map);
        //console.log (res.map.result);
        if (err) reject(err);
        //else resolve(res.map.trtCntn[0]) ;
        else resolve(res.map) ;
      })
    })
  },

  getSignUpEmailMessage: function (email, link, date) {
    let message = "";
    message += `안녕하세요. `+email+` 님.\n`;
    message += `\n`;
    message += `이메일 본인 확인을 위한 메일입니다.\n`;
    message += `안전한 스마트영수증 사용을 위해 아래의 이메일 주소 인증 버튼을\n`;
    message += `클릭하여 본인 인증을 완료해 주시기 바랍니다.\n`;
    message += `본인 인증 미완료 시 사용에 제한이 있을 수 있습니다.\n`;
    message += `\n`;
    message += `이메일주소인증: ${link}\n`;
    message += `인증유효시간: ${date} 까지\n`;
    message += `\n`;
    message += `감사합니다.\n`;
    message += `-------------------------------------------------------------------\n`;
    message += `본 메일은 발신전용입니다.\n`;
    message += `Copyright 2021 by HANCOM LIFECARE Inc. All Rights Reserved.\n`;
    return message;
  },

  getSignUpEmailTitle: function() {
    return "회원가입을 위한 본인인증 메일입니다";
  },

  getPasswdEmailMessage: function (email, key, date) {
    let message = "";
    message += `안녕하세요. `+email+` 님.\n`;
    message += `요청하신 비밀번호 변경을 위한 인증번호는 다음과 같습니다.\n`;
    message += `진행 중인 화면에서 인증번호를 이용하여 새로운 비밀번호로 설정하셔야\n`;
    message += `정상적으로 로그인이 가능합니다.\n`;
    message += `\n`;
    message += `▪ 인증번호: ${key}\n`;
    message += `  발급시간: ${date}\n`;
    message += `\n`;
    message += `다른 문의사항이 있으시면 XXXX@xxx.com로 문의해주시기 바랍니다.\n`;
    message += `감사합니다.\n`;
    message += `-------------------------------------------------------------------\n`;
    message += `본 메일은 발신전용입니다.\n`;
    message += `Copyright 2021 by HANCOM LIFECARE Inc. All Rights Reserved.\n`;
    return message;
  },

  getPasswdEmailTitle: function() {
    return "비밀번호 변경을 위한 본인인증 메일입니다";
  },

  getQR2URL: function (d, callback) {
    let qrCode = require('qrcode')
    qrCode.toDataURL(d, function (err, data) {
      callback (data);
    });
  },

  genReceiptBody: function() {
    let t = moment().format("YYYY-MM-DD HH:mm:ss");
    let message = "";
    message += `스타벅스 전주한옥마을점                   \n`;
    message += `대표:송데이비드호섭 201-81-21515 1522-3232\n`;
    message += `주소: 전라북도 전주시 완산구 전동 187-9   \n`;
    message += `==========================================\n`;
    message += `${t}                       \n`;
    message += `==========================================\n`;
    message += `상품                   단가 수량      금액\n`;
    message += `------------------------------------------\n`;
    message += ` 카페 라떼            9,200    1     9,200\n`;
    message += `==========================================\n`;
    message += `부가세과세합계:                      8,364\n`;
    message += `부    가    세:                        836\n`;
    message += `합          계:                      9,200\n`;
    message += `------------------------------------------\n`;
    message += `받    은    돈:                      9,200\n`;
    message += `              (현    금)             9,200\n`;
    message += `------------------------------------------\n`;
    message += `거    스    름:                          0\n`;
    message += `------------------------------------------\n`;
    message += `영수증을 지참하시면                       \n`;
    message += `교환/환불시 더욱 편리합니다.              \n`;
 
    return  iconv.encode(message, 'euc-kr').toString('hex');
  },
}

