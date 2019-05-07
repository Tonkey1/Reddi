var express = require('express');
var router = express.Router();
var formidable = require('formidable');
// Get the choosesignup modal

/* GET home page. */
router.get('/', function(req, res) {
  res.render('postaccommodation');
  console.log("receive post accommodation!");
}).post('/', function(req, res){ //post not be called
	console.log("i'm here!!!")
    var form = new formidable.IncomingForm();  
    form.uploadDir="public/images";
    form.multiples = true;
    form.keepExtensions=true;
    // var files = [];
    // form.on('/',function(field,file){
    // 	files.push([filed,file]);
    // })
    // console.log(files);
    // console.log(files.length)
    form.parse(req, function(err, fields, files) {  
        console.log('fields',fields);//表单传递的input数据  
        var path=[];
        console.log('files',files.photo.length);//上传文件数据
        for(i=0;i<files.photo.length;i++){
        	path.push(files.photo[i].path);
        } 
        console.log(path);
        var House = global.dbHandel.getModel('house');
        //do somthing...... 
        var tag = new Array(fields.wifi,fields.tv,fields.heating,fields.aircon,fields.kitchen,fields.gym,
        	fields.elevator,fields.electricity,fields.water,fields.mgnt);
		House.create({                            
		    type: fields.type,
		    guests: fields.guests,
		    size: fields.size,
		    bed: fields.bed,
		    bath: fields.bath,
		    title: fields.name,
		    description: fields.description,
		    picturePath: path,
		    address: fields.address,
		    tag: tag,
		    rent: fields.price,
		    availableDate: fields.startday,
		    duration: fields.duration,
		    landloardName: req.session.user.name,
		    landloardContact:req.session.user.contact
		},function(err,doc){ 
		    if (err) {
		        res.send(500);
		        //res.redirect("/ssignup");
		        
		        console.log(err);
		        console.log("fail to create database！");

		    } else {
		        req.session.error = 'Create user success！';
		        console.log("success!!!!!");
		        res.redirect("/lselfprofile");
		        //res.send(200);
		    }
		});     
    });  
    
	// 

	// var type = req.body.type;
 //    var guests = req.body.guests;
 //    var size = req.body.size;
 //    var bed = req.body.bed;
 //    var bath =  req.body.bath;

 //    var title =  req.body.name;
 //    var description =  req.body.description;
 //    //var picturePath = req.body.cover;
 //    //need to complete
 //    var address = req.body.address;
 //    console.log(address);

 //    var rent = req.body.price;
 //    //landloardName:{type:String, required:true},
 //    //landloardContact:{type:String, required:true},
 //    //not require input
 //    //Comment:{type:String, required:false},
 //    var availableDate = req.body.startday;
 //    var duration = req.body.duration;
 //    //tag:{type:Array, required:false},
    
 //    var wifi = req.body.wifi !==undefined;
 //    var tv =req.body.tv!==undefined;
 //    var heating =req.body.heating!==undefined;
 //    var air =req.body.aircon!==undefined;
 //    var kitchen =req.body.kitchen!==undefined;
	// var gym =req.body.gym!==undefined;
	// var elevator =req.body.elevator !==undefined;
	// //default: landlord pay the water and electricity fees
	// var electricityFee = req.body.electricity == "lelectricity";
	// var waterFee =req.body.water == "lwater";
	// var managementFee =req.body.mgnt == "lmgnt";
	// var tag = new Array(wifi,tv,heating,air,kitchen,gym,elevator,electricityFee,waterFee,managementFee);
	// House.create({                            
 //        type: type,
 //        guests: guests,
 //        size: size,
 //        bed: bed,
 //        bath: bath,
 //        title: title,
 //        description: description,
 //        address: address,
 //        tag: tag,
 //        rent: rent,
 //        availableDate: availableDate,
 //        duration: duration
 //    },function(err,doc){ 
 //        if (err) {
 //            res.send(500);
 //            //res.redirect("/ssignup");
            
 //            console.log(err);
 //            console.log("fail to create database！");

 //        } else {
 //            req.session.error = 'Create user success！';
 //            console.log("success!!!!!");
 //            res.redirect("/mainpage");
 //            //res.send(200);
 //        }
 //    });
});


module.exports = router;