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
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var config = require('config-lite')(__dirname);  // config-lite 的 v2 的调用方式不太一样
var routes = require('./routes/blog');  // 加载 ./routes/blog/index.js, node 会默认加载文件夹下的 index.js
var pkg = require('./package');  // 加载 package.json 文件
var winston = require('winston');
var expressWinston = require('express-winston');

var index = require('./routes/index');
var users = require('./routes/users');  // 加载了 index. js 和 users.js 路由文件
// My code
// var blog = require('./routes/blog');  // 后来把 ./routes/blog.js 换成目录了

var app = express();  // 生成一个 express 实例 app, 我们就要大量使用这个变量来配置 Express

// view engine setup
app.set('views', path.join(__dirname, 'views'));  // 设置存放视图文件(模板文件)的目录, __dirname 为全局变量, 存储当前正在执行的脚本所在的目录
app.set('view engine', 'pug');  // 设置模板引擎
// My code: ejs 和 pug 共存, 但用 ejs 的时候要加上扩展名
var engines = require('consolidate');
app.engine('jade', engines.jade);
app.engine('ejs', engines.ejs);

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));  // 加载日志中间件
app.use(bodyParser.json());  // 加载解析 json 的中间件
app.use(bodyParser.urlencoded({ extended: false }));  // 加载解析 urlencoded 请求体的中间件
app.use(cookieParser());  // 加载解析 cookie 的中间件
app.use(express.static(path.join(__dirname, 'public')));  // 设置存放静态文件的目录, 告诉静态文件的位置, 并且让静态文件夹作为顶层结构
// My code, 使用了 bower
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
// link(rel='stylesheet', href='/bower_components/messenger/build/css/messenger.css')  // 要这样用
// 连接数据库到路由件; 使程序使用自定义功能, 在使用之前我们先设置我们的路由件, 所以我们可以这样使用
app.use(function(req, res, next){
    req.db = db;  // 添加 db 到 app.use, 这样我们就在每一个 HTTP request 添加了这个对象, 这样性能可能不是很优化
    next();
});  // 这些代码要放到 app.use('/', index) 前面, 先定义
// 每一次的 request 中首先使用了数据库调用
// session 中间件
app.use(session({
    name: config.session.key,  // 设置 cookie 中保存 session id 的字段名称
    secret: config.session.secret,  // 通过设置 secret 来计算 hash 值并放在 cookie 中, 使产生的 signedCookie 防篡改
    cookie: {
        maxAge: config.session.maxAge  // 过期时间, 过期后 cookie 中的 session id 自动删除
    },
    store: new MongoStore({  // 将 session 存储到 mongodb
        url: config.mongodb  // mongodb 地址
    })
}));
app.use(flash());  // flash 中间价, 用来显示通知
app.use(require('express-formidable')({  // 处理表单及文件上传的中间件
    uploadDir: path.join(__dirname, 'public/imgages'),  // 上传文件目录
    keepExtensions: true  // 保留后缀
}));
app.locals.blog = {  // 设置模板全局常量
    title: pkg.name,
    description: pkg.description
};
// 添加模板必需的三个变量
app.use(function (req, res, next) {
    res.locals.user = req.session.user;
    res.locals.success = req.flash('success').toString();
    res.locals.error = req.flash('error').toString();
    next();
});
// 正常请求的日志
app.use(expressWinston.logger({
    transports: [
        new (winston.transports.Console)({
            json: true,
            colorize: true
        }),
        new winston.transports.File({
            filename: 'logs/success.log'
        })
    ]
}));

// app.use 使用的就是 Express 的中间件
app.use('/', index);
app.use('/users', users);  // 路由控制器
// My code
routes(app);  // 另一种路由控制器方法, var routes = require('./routes/blog');  // 加载 ./routes/blog/index.js
// 中间件的加载顺序很重要, 如上面设置静态文件目录的中间件应该放到 routes(app) 之前加载, 这样静态文件的请求就不会落到业务逻辑的路由里
// flash 中间件应该放到 session 中间件之后加载, 因为 flash 是基于 session 的

// My code: 错误请求的日志
app.use(expressWinston.errorLogger({
    transports: [
        new winston.transports.Console({
            json: true,
            colorize: true
        }),
        new winston.transports.File({
            filename: 'logs/error.log'
        })
    ]
}));
// error page
app.use(function (err, req, res, next) {
    res.render('error', {
        error: err
    });
});

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

// module.exports = app;  // 导出 app 实例供其他模块调用
if (module.parent) {  // 这样写更加方便, 可以不用 ./bin/www, 也可以用
    module.exports = app;
} else {
    var server = app.listen(config.port, function () {  // 监听端口, 启动程序
        console.log(`${pkg.name} listening on port ${config.port}`);
    });
    require('./chat-server').listen(server);  // 还有一个聊天室的服务要开
}
