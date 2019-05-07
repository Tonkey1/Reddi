var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('mainpage');
	// var House = global.dbHandel.getModel('house');
	// houseInfo = []
	// House.find({},function(err,docs){  
	// 	houseInfo = docs
	// 	number = houseInfo.length
	// 	console.log(houseInfo[0]['title'])
	// 	console.log(number)
	// 	console.log(houseInfo)
	// 	res.render('mainpage',{
	// 		house: houseInfo,
	// 		number_of_house: number})
	// 	});
}).post('/',function(req, res){
	var User = global.dbHandel.getModel('user');
    var email = req.body.email;
    var upwd = req.body.psw;
    console.log("login post");
    // console.log(User)
    User.findOne({email:email},function(err,doc){  
        if(err){                                        
            //res.send(500);
            console.log(err);
        }else if(!doc){                                
            req.session.error = 'User not exists';
            console.log("User name not exists");
            //res.send(404);                           
            res.redirect("/mainpage");
        }else{ 
            if(upwd != doc.password){    
                console.log("Password wrong");
                // res.send(200);
                req.session.error = "password wrong";
                res.redirect("/mainpage");
            }else{                                     
                req.session.user = doc;
                res.redirect('/mainpage_login');
    //             var House = global.dbHandel.getModel('house');
				// houseInfo = []
				// House.find({},function(err,docs){  
				// 	houseInfo = docs
				// 	number = houseInfo.length
				// 	console.log(houseInfo[0]['title'])
				// 	console.log(number)
				// 	// console.log(houseInfo)
    //                     console.log(req.session.user.type)
				// 	// res.redirect("/mainpage")
				// 	if(req.session.user.type == 'Student'){
		  //   //             res.render('mainpage_login',{
				// 		// house: houseInfo,
				// 		// number_of_house: number
				// 		// });
    //                     // console.log("143")
				// 		res.redirect("/mainpage_login");
		  //           }
				// 	else if(req.session.user.type == "Landlord"){
		  //   //             res.render('mainpage_login',{
				// 		// house: houseInfo,
				// 		// number_of_house: number
				// 		// });
    //                     // res.redirect("/mainpage_login");
    //                     // console.log("123")
    //                     res.redirect("/mainpage_login");
		  //           }
    //         	});
        	}
    	};
});
});

module.exports = router;