var express = require('express');
var router = express.Router();
var user_service = require('../lib/service/user_service');

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

/*注册用户*/
router.post('/user/register', function(req, res, next) {
	user_service.registerUser(req.body.user);
	res.send(req.body.user);
});

module.exports = router;