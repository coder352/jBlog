var express = require('express');
var router = express.Router();

// 这个对应 user-manager.pug 界面, 下面三个是三个 Restful API, 没有对应界面
router.get('/', function(req, res, next) {
    res.render('user-manager', { title: 'Express' });
  // res.send('respond with a resource');  // 显示这句话, 没有任何效果
});
// GET /user/userlist
router.get('/userlist', function(req, res, next) {
  var db = req.db;
  var collection = db.get('userlist');
  collection.find({}, {}, function(e, docs){ res.json(docs); });  // json() 进行格式化
});
/* POST /user/adduser. */
router.post('/adduser', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    console.log(req.body);  // { username: 'aa', email: 'bb', fullname: 'cc', age: 'dd', location: 'ee', gender: 'ff' }
    collection.insert(req.body, function(err, result){
        res.send( (err === null) ? {msg: ''} : {msg: err} );
    });
});
/* DELETE /user/deleteuser */
router.delete('/deleteuser/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    var userToDelete = req.params.id;
    collection.remove({'_id': userToDelete}, function(err) {
        res.send((err === null) ? {msg: ''} : {msg:'error: ' + err});
    });
});
module.exports = router;
