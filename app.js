let express  = require('express');
let partials = require('express-partials');
let app      = express();

let moment   = require('moment-timezone');
let cookie   = require('cookie-parser')

let lib      = require('./lib')
let router   = require('./router')

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(cookie())
app.use(partials());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(__dirname + '/public'));

// Middleware
app.use(function (req, res, next) {
  req.timestamp  = moment().unix();
  req.receivedAt = moment().tz('Asia/Seoul').format('YYYY-MM-DD hh:mm:ss');

  switch(req.method) {
  case "GET":  console.log(req.receivedAt, req.protocol.toUpperCase(), req.method, req.url, req.params); break;
  case "POST": console.log(req.receivedAt, req.protocol.toUpperCase(), req.method, req.url, req.body);   break;
  } next();
});

/*
lib.utils.postCRN('1018126409').catch(err => console.log(err))
    .then(result => console.log(result))

lib.google.getGeocode("철산래미안자이아파트").catch(err => console.log(err))
    .then(result => console.log(result))

lib.google.getReverseGeocode(45.767, 4.833).catch(err => console.log(err))
    .then(result => console.log(result))
*/

lib.https.listen (router.main (app));
