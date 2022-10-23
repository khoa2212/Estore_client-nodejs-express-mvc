var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const passport = require('./auth/passport');
const bodyParser = require('body-parser');

//------------------
var usersRouter = require('./routes/users');
//------------------
var indexRouter = require('./components/home/homeRouter');
var productsRouter = require('./components/products/productsRouter');
var authRouter = require('./components/auth/authRouter');
var cartRouter = require('./components/cart/cartRouter');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

var accountRouter = require('./components/myAccount/accountRouter');
var changePasswordRouter = require('./components/changePasword/changePasswordRouter')

app.use(function (req, res, next){
  res.locals.user = req.user;
  next();
});
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/', authRouter);
app.use('/myAccount', accountRouter);
app.use('/changePassword', changePasswordRouter);
app.use('/cart', cartRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
