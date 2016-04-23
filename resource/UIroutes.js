'use strict';
var express  = require('express');
var passport = require('passport');
var ui       = express.Router();

ui.route('/')
  .get(function(req, res) {
    res.render('index.ejs');
  });

ui.route('/login')
  .get(function(req, res) {
    res.render('account/login.ejs', { message: req.flash('loginMessage') });
  });

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

ui.route('/logout')
  .get(function(req, res) {
    req.logout();
    res.redirect('/');
  });

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

module.exports = ui;
