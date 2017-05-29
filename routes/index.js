var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) { res.render('index', { title: 'Express' }); });
router.get('/signin', function(req, res, next) { res.render('signin', { title: 'Express' }); });
router.get('/helloworld', function(req, res) { res.render('helloworld', { title: 'Hello, World!' }); });
// 下面的三个对应的是 user-new.pug user-list.pug 两个界面, 在 user-new.pug 中点击确定按钮后自动跳转到 user-list.pug 界面
router.get('/user-new', function(req, res){ res.render('user-new', { title: 'Add New User' }); });
router.get('/user-list', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({}, {}, function(e, docs){
        res.render('user-list', { "userlist": docs });  // 这里不设置 title 就为空
    });  // 从 http request 取出 db 对象, 通过 db 获取收据并填充 docs 变量, 然后像其他两个路由一样渲染页面
});
router.post('/adduser', function(req, res){  // users.js 中还有一个 users/adduser, 对比一下
    var db = req.db;  // 设置数据库参数
    var username = req.body.username;
    var userEmail = req.body.useremail;  // 从表单中获得数据
    var collection = db.get('usercollection');  // 设置 collection
    // Submit to the DB
    collection.insert({
        "username": username,
        "email": userEmail
    },function(err, doc){
        if(err){
            res.send("There was a problem adding the information to the database.");
        }else{
            res.redirect("user-list");  // redirect 是调用 /userlist, 不是渲染 jade/pug
        }
    });
});

module.exports = router;
