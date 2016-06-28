var express = require('express');
var router = express.Router();
var user_service = require('../lib/service/user_service');

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

/*注册用户*/
router.post('/user/register', function(req, res, next) {
	user_service.registerUser(req.body.user, function(user) {
		res.send(user);
	});
	
});

/*获取用户信息*/
router.get('/user/:id', function(req, res, next) {
	user_service.findUser(req.params.id, function(user) {
		res.send(user);
	});
});

/*获取用户信息*/
router.get('/user/list/users', function(req, res, next) {
	user_service.listAllUser(function(users) {
		res.send(users);
	});
});

module.exports = router;