var router = require('express').Router();

router.get('/', function(req, res, next) {
    res.render('search-engine/index', { title: 'Search Engine' });
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
