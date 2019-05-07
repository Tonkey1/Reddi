var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	if(req.session.user == null){
		res.redirect("/mainpage")
		// var House = global.dbHandel.getModel('house');
		// houseInfo = []
		// House.find({},function(err,docs){  
		// 	houseInfo = docs
		// 	number = houseInfo.length
		// 	console.log(houseInfo[0]['title'])
		// 	console.log(number)
		// 	// res.render('mainpage',{
		// 	// 	house: houseInfo,
		// 	// 	number_of_house: number});
		// 	res.redirect("/mainpage");
		// });
	}
	else{
		res.render("mainpage_login")
		// var House = global.dbHandel.getModel('house');
		// houseInfo = []
		// House.find({},function(err,docs){  
		// 	houseInfo = docs
		// 	number = houseInfo.length
		// 	console.log(houseInfo[0]['title'])
		// 	console.log(number)
			
		// 	res.render('mainpage_login',{
		// 		house: houseInfo,
		// 		number_of_house: number})
		// 	});
	}
}).post('/',function(req, res){
	console.log("log out!!!")
	req.session.user = null;
	res.redirect("/mainpage")
	// var House = global.dbHandel.getModel('house');
	// 	houseInfo = []
	// 	House.find({},function(err,docs){  
	// 		houseInfo = docs
	// 		number = houseInfo.length
	// 		console.log(houseInfo[0]['title'])
	// 		console.log(number)
			
	// 		// res.render('mainpage',{
	// 		// 	house: houseInfo,
	// 		// 	number_of_house: number})
	// 		// });
	// 		res.redirect("/mainpage")
	// 	});
    
});

module.exports = router;