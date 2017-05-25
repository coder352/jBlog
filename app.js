var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// My code
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/jblog');  // db 就是一个 Monk 连接对象

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// My code, 连接数据库到路由件; 使程序使用自定义功能, 在使用之前我们先设置我们的路由件, 所以我们可以这样使用
app.use(function(req, res, next){
    req.db = db;  // 添加 db 到 app.use, 这样我们就在每一个 HTTP request 添加了这个对象, 这样性能可能不是很优化
    next();
});  // 这些代码要放到 app.use('/', index) 前面, 先定义
// 每一次的 request 中首先使用了数据库调用

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
