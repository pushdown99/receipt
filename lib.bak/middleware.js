'use strict';

const moment  = require('moment-timezone');

module.exports = function(app, flag) {
  app.use(function (req, res, next) {
    req.timestamp  = moment().unix();
    req.receivedAt = moment().tz('Asia/Seoul').format('YYYY-MM-DD hh:mm:ss');
    let status = res.statusCode;

    switch(req.method) {
    case "GET":
      console.log(req.receivedAt, req.protocol.toUpperCase(), req.method, req.url, req.params);
      break;
    case "POST":
      console.log(req.receivedAt, req.protocol.toUpperCase(), req.method, req.url, req.body);
      break;
    }

    if(flag) {
      var oldWrite = res.write, oldEnd = res.end;
      var chunks = [];
      res.write = function (chunk) {
        chunks.push(chunk);
        return oldWrite.apply(res, arguments);
      };
      res.end = function (chunk) {
        if(typeof chunk == 'string') {
          chunk = Buffer.from(chunk, 'utf-8');
        }
        if (chunk) chunks.push(chunk);
        let body = Buffer.concat(chunks).toString('utf8');
        //if(this.get('Content-Type') == 'application/json; charset=utf-8' || this.get('Content-Type') == 'text/html; charset=utf-8') {
        if(this.get('Content-Type') == 'application/json; charset=utf-8') {
          console.log(req.receivedAt, req.protocol.toUpperCase(), status, body);
        }
        oldEnd.apply(res, arguments);
      };
    }
    next();
  });
}

