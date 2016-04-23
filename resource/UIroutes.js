'use strict';
var express  = require('express');
var passport = require('passport');
var ui       = express.Router();

ui.route('/')
  .get(function(req, res) {
    res.render('index.ejs');
  });

// ------ LOCAL ACCOUNT --------------------------------------------------------

ui.route('/login')
  .get(function(req, res) {
    res.render('account/login.ejs', { message: req.flash('loginMessage') });
  })
  .post(passport.authenticate('local-login', {
    successRedirect : '/profile',
    failureRedirect : '/login',
    failureFlash : true
  }));

ui.route('/register')
  .get(function(req, res) {
    res.render('account/register.ejs', { message: req.flash('registerMessage') });
  })
  .post(passport.authenticate('local-signup', {
      successRedirect : '/profile',
      failureRedirect : '/register',
      failureFlash : true
  }));

ui.route('/profile')
  .get(isLoggedIn, function(req, res) {
    res.render('account/profile.ejs', {
      user : req.user
    });
  });

// ------ FACEBOOK -------------------------------------------------------------

ui.route('/auth/facebook')
  .get(passport.authenticate('facebook', {
    scope : 'email'
  }));

ui.route('/auth/facebook/callback')
  .get(passport.authenticate('facebook', {
    successRedirect : '/profile',
    failureRedirect : '/'
  }));

// ------ LOGOUT ---------------------------------------------------------------

ui.route('/logout')
  .get(function(req, res) {
    req.logout();
    res.redirect('/');
  });

// ------ MIDDLEWARE -----------------------------------------------------------

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

module.exports = ui;
