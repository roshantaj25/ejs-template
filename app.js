var createError = require('http-errors');
var express = require('express');
var router = express.Router();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', './layout');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({
  extended: true
}))

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.error(err);
	res.status(err.status || 500);
	res.locals.statusCode = res.statusCode;

	if (err.status == 404) {
		res.locals.message = "PAGE NOT FOUND";
	} else {
		res.locals.message = "Internal server error!";
	}

	// set locals, only providing error in development
	// res.locals.message = err.message;
	res.locals.error = req.app.get('env') !== 'production' ? err : {};

	// render the error page
	res.render('error', {
		title: 'home_title'
	});
});

module.exports = app;
