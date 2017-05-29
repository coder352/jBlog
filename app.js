var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');  // 加载各种模块

// My code
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/jblog');  // db 就是一个 Monk 连接对象

var index = require('./routes/index');
var users = require('./routes/users');  // 加载了 index. js 和 users.js 路由文件

var app = express();  // 生成一个 express 实例 app, 我们就要大量使用这个变量来配置 Express

// view engine setup
app.set('views', path.join(__dirname, 'views'));  // 设置存放视图文件(模板文件)的目录, __dirname 为全局变量, 存储当前正在执行的脚本所在的目录
app.set('view engine', 'pug');  // 设置模板引擎

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));  // 加载日志中间件
app.use(bodyParser.json());  // 加载解析 json 的中间件
app.use(bodyParser.urlencoded({ extended: false }));  // 加载解析 urlencoded 请求体的中间件
app.use(cookieParser());  // 加载解析 cookie 的中间件
app.use(express.static(path.join(__dirname, 'public')));  // 设置存放静态文件的目录, 告诉静态文件的位置，并且让静态文件夹作为顶层结构
// My code, 使用了 bower
app.use('/bower_components', express.static(__dirname + '/bower_components'));

// My code, 连接数据库到路由件; 使程序使用自定义功能, 在使用之前我们先设置我们的路由件, 所以我们可以这样使用
app.use(function(req, res, next){
    req.db = db;  // 添加 db 到 app.use, 这样我们就在每一个 HTTP request 添加了这个对象, 这样性能可能不是很优化
    next();
});  // 这些代码要放到 app.use('/', index) 前面, 先定义
// 每一次的 request 中首先使用了数据库调用

// app.use 使用的就是 Express 的中间件
app.use('/', index);
app.use('/users', users);  // 路由控制器

// catch 404 and forward to error handler
app.use(function(req, res, next) {  // 先地应了两个路由, 然后其他的都走 404
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;  // 生产环境下的错误处理器, 将错误信息渲染 error 模版并显示到浏览器中
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page 开发环境下的错误处理器, 将错误信息渲染 error 模版并显示到浏览器中
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;  // 导出 app 实例供其他模块调用
