'use strict'
// ------ Require packages
var express      = require('express');
var mongoose     = require('mongoose');
var passport     = require('passport');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var flash        = require('connect-flash');
var morgan       = require('morgan');

// ------ Configre the application
var app          = express();
var port         = process.env.PORT || 3000;
var config       = require('./resource/config');
//                   require('./resource/config')(passport);

// mongoose.connect(config.dbURL);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());

app.set('view engine', 'ejs');

app.use(session({ secret: config.secret }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// ------ Build the routes
// require('./resource/routes.js')(app, passport);

// ------ Serve
app.listen(port, function() {
  console.log('Running on port ' + port);
});
