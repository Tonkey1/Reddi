var express = require('express');
var router = express.Router();
// Get the choosesignup modal

/* GET home page. */
router.get('/', function(req, res) {
	if(req.session.user.type == "Student"){
		res.redirect("/sprofile");
	}
	else{
		console.log("lprofile!!!")
		// console.log(req.cookies.email)
	  	
	  	var User = global.dbHandel.getModel('user');
		userInfo = []
		User.find({email:req.session.user.email},function(err,doc){  
			userInfo = doc
			console.log(userInfo)
			res.render('lprofile',{user:userInfo})
		});
	}
});

module.exports = router;