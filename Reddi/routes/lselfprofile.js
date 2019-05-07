var express = require('express');
var router = express.Router();
// Get the choosesignup modal

/* GET home page. */
router.get('/', function(req, res) {

	if(req.session.user == null){

	}
	if(req.session.user.type == "Student"){
		res.redirect("/sselfprofile");
	}
	else{
		console.log("lselfprofile!!!")
		// console.log(req.cookies.email)
	  	
	  	var User = global.dbHandel.getModel('user');
		userInfo = []
		
		User.find({email:req.session.user.email},function(err,doc){  
			userInfo = doc
			console.log(userInfo)
			//var path=[];
			if(userInfo[0]['portraitPath']){
				var path=userInfo[0]['portraitPath'].split("\\")
				console.log(path)
				//userInfo[0]['portraitPath']=path[0]+"/"+path[1]+"/"+path[2];
				userInfo[0]['portraitPath']=path[1]+"/"+path[2];
				console.log(userInfo[0]['portraitPath'])
			}
			
			res.render('lselfprofile',{user:userInfo})
		});
	}
});

module.exports = router;