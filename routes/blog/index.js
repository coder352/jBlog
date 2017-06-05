var express = require('express');
var router = express.Router();

// router.get('/', function(req, res, next) { res.render('blog/header.ejs', { title: 'Express' }); });
router.get('/', function(req, res) { res.redirect('/blog/posts'); });  // 转到路由 /posts
// router.get('/posts', function(req, res) { res.render('blog/header.ejs', { title: 'Express' }); });  // 上面两个进行的测试
// router.get('/signup', require('./signup'));
// router.get('/signin', require('./signin'));
// router.get('/signout', require('./signout'));
// router.use('/posts', require('./posts'));


module.exports = router;
