var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) { res.render('index', { title: 'Express' }); });
router.get('/signin', function(req, res, next) { res.render('signin', { title: 'Express' }); });
router.get('/helloworld', function(req, res) { res.render('helloworld', { title: 'Hello, World!' }); });
//================================================================
// 下面的三个对应的是 user-add.pug user-list.pug 两个界面, 在 user-add.pug 中点击确定按钮后自动跳转到 user-list.pug 界面
router.get('/user-add', function(req, res){ res.render('user-add', { title: 'Add New User' }); });
router.get('/user-list', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({}, {}, function(e, docs){
        res.render('user-list', { "userlist": docs });  // 这里不设置 title 就为空
    });  // 从 http request 取出 db 对象, 通过 db 获取收据并填充 docs 变量, 然后像其他两个路由一样渲染页面
});
router.post('/user-adduser', function(req, res){  // users.js 中还有一个 users/adduser, 对比一下
    var db = req.db;  // 设置数据库参数
    var username = req.body.username;
    var userEmail = req.body.useremail;  // 从表单中获得数据
    var collection = db.get('usercollection');  // 设置 collection
    // Submit to the DB
    collection.insert({ "username": username, "email": userEmail
    },function(err, doc){
        if(err){ res.send("There was a problem adding the information to the database."); }
        else{ res.redirect("user-list"); }  // redirect 是调用 /userlist, 不是渲染 jade/pug
    });
});
//================================================================
// 下面是聊天室 chat-* 的相关路由, 只涉及到一个界面 chat.pug, chat.pug 继承自 chat-layout.pug
router.get('/chat', function(req, res) { res.render('chat', { title: '聊天室' }); });
router.get('/chat-getuser', function(req, res) {
    var data = { name:"陈泽彬", sex:"男", img:"/images/chat/1.jpg" };
    res.json(data);
});
router.get('/chat-getalluser', function(req, res) {
    var data = [
        { name:"陈泽彬", sex:"男", img:"/images/chat/1.jpg" },
        { name:"陈泽彬", sex:"男", img:"/images/chat/1.jpg" },
        { name:"陈泽彬", sex:"男", img:"/images/chat/1.jpg" }];
    res.json(data);
});
//================================================================
// 下面是 tools 相关路由
router.get('/tools/html2jade', function(req, res) { res.render('tools/html2jade', { title: 'HTML2Pug - HTML to Pug Online Realtime Converter' }); });
html2jade = require('html2jade');
router.post('/tools/html2jade-convert', function (req, res) {
	var html = req.body.html;
    html2jade.convertHtml(html, {}, function (err, jade) { res.json({ jade: jade }); });
});
//================================================================
// Echarts 相关路由
var os = require('os');
router.get('/echarts/', function(req, res) { res.render('echarts/index', { freemem: os.freemem() ,totalmem:os.totalmem()} )});

module.exports = router;
