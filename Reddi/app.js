var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var multer = require('multer');
var mongoose = require('mongoose');
var session = require('express-session');
// var jQuery = require('jQuery');

var mainpage = require('./routes/mainpage');
var mainpage_login = require('./routes/mainpage_login');
var signup = require('./routes/signup');
var ssignup = require('./routes/ssignup');
var lsignup = require('./routes/lsignup');
var postaccommodation = require('./routes/postaccommodation');
var leditprofile = require('./routes/leditprofile');
var seditprofile = require('./routes/seditprofile');
var sprofile = require('./routes/sprofile');
var lprofile = require('./routes/lprofile');
var sselfprofile = require('./routes/sselfprofile');
var lselfprofile = require('./routes/lselfprofile');
var house = require('./routes/house');
var roommate = require('./routes/house');
// var checkmark = require('./routes/checkmark');
// var login = require('./routes/login');
// var smainpage = require('./routes/smainpage');
// var lmainpage = require('./routes/lmainpage');
// var logout = require('./routes/logout');
// var home = require('./routes/home');
// var users = require('./routes/users');

global.dbHandel = require('./database/dbHandel');
global.db = mongoose.connect("mongodb://localhost:27017/nodedb");
var app = express();
app.use(session({ 
	secret: 'secret',
	cookie:{ 
    value: "",
		maxAge: 1000*60*30
	}
}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine("html",require("ejs").__express); // or   app.engine("html",require("ejs").renderFile);
//app.set("view engine","ejs");
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(multer({}));
// app.use(multer({dest:'./uploads/'}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next){ 
	res.locals.user = req.session.user;
	var err = req.session.error;
	delete req.session.error;
	res.locals.message = "";
	if(err){ 
		res.locals.message = '<div class="alert alert-danger" style="margin-bottom:20px;color:red;">'+err+'</div>';
	}
	next();
});

app.use('/', mainpage);
app.use('/mainpage', mainpage);
app.use('/mainpage_login', mainpage_login);
// app.use('/users', users); 
app.use('/signup',signup);
// app.use('/choosesignup',choosesignup);
app.use('/ssignup',ssignup);
app.use('/lsignup',lsignup);
app.use('/postaccommodation',postaccommodation);
app.use('/seditprofile',seditprofile);
app.use('/leditprofile',leditprofile);
app.use('/sprofile',sprofile);
app.use('/lprofile',lprofile);
app.use('/lselfprofile',lselfprofile);
app.use('/sselfprofile',sselfprofile);
app.use('/house',house);
app.use('roommate',roommate);
// app.use('/checkmark',checkmark);
// app.use('/login',login); 
// app.use('/smainpage', mainpage);  
// app.use('/lmainpage', mainpage);  
// app.use('/logout',logout); 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

console.log("server start!");

module.exports = app;