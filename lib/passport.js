'use strict';

const dotenv  = require('dotenv').config({ path: require('find-config')('.env') })

const passport = require('passport');
const local    = require('passport-local').Strategy;
const google   = require('passport-google-oauth2').Strategy;
const session  = require('express-session');
const store    = require('express-mysql-session')(session)
const flash    = require('express-flash');
const lib      = require('.');

module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login');
  },
  setup: function (app) {
    app.use(
      session({ secret: 'short', resave: false, saveUninitialized: false, cookie:{ secure: false },
        store: new store ({ host:'localhost', port: 3306, user: 'sqladmin', password: 'admin', database: 'hancom' }),
      })
    );
    app.use(passport.initialize());
    app.use(passport.session());    
    app.use(flash());

    passport.use (new local (function (username, passwd, done) {
      var result = lib.mysql.getAdminUserEmail([username]);
      console.log (result);
      if(result.length > 0 && passwd === result[0].passwd) { console.log('login-success', username, passwd); return done (null, result[0]) }
      if(result.length < 1) { console.log('login-failure', username, passwd); return done(false, null); }
      else { console.log('login-failure', username, passwd); return done(false, null); }
    }));

    passport.use(new google({
      clientID:     process.env.GOOGLE_CLIENT_ID, 
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:  process.env.GOOGLE_CALLBACK_URL
      },
      function(accessToken, refreshToken, profile, done) {
        process.nextTick(function () { return done(null, profile); });
      }
    ));

    passport.serializeUser (function(user, done) {
      //console.log('serializeUser', user);
      done (null, user);
    });
  
    passport.deserializeUser (function(obj, done) {
      //console.log('deserializeUser', obj);
      done (null, obj);
    });

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //app.post ('/auth/local', passport.authenticate ('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: true, }));
    app.post ('/auth/local', function(req, res, next) {
      if(req.body.member == "1") passport.authenticate ('local', { successRedirect: '/member', failureRedirect: '/login', failureFlash: true, })(req,res,next);
      else                       passport.authenticate ('local', { successRedirect: '/admin',  failureRedirect: '/login', failureFlash: true, })(req,res,next);
    });
    app.get  ('/logout', function(req, res) { req.logout(); res.redirect('/login'); });  

    app.get('/auth/google',   passport.authenticate('google', {scope: ['openid', 'email', 'profile']}), function(req, res){});
    app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), function(req, res) { console.log(req.query); res.redirect('/'); }); 

  },
}
