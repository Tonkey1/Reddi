var express = require('express');
var router = express.Router();
// Get the choosesignup modal

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("sprofile!!!")
	// console.log(req.cookies.email)
  	res.render('sprofile');
  	var User = global.dbHandel.getModel('user');
	userInfo = []
	House.find({email:req.session.user.email},function(err,doc){  
		userInfo = doc
		console.log(userInfo)
		res.render('sprofile',{user:userInfo})
	});
});

module.exports = router;