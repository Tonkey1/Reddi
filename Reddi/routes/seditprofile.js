var express = require('express');
var router = express.Router();
var formidable = require('formidable');

// router.get('/', function(req, res, next) {
//   res.render('leditprofile');
// });

/* GET home page. */
router.get('/',function(req,res){   
    if(req.session.user.type == 'Student'){
        var User = global.dbHandel.getModel('user');
        userInfo = []
        User.find({email:req.session.user.email},function(err,docs){  
            userInfo = docs
            // console.log(houseInfo)
            res.render('seditprofile',{user:userInfo})
        });
    }
    else{
        res.redirect("/mainpage");
    }
}).post('/', function(req,res){ 
    console.log("in post!!!!!!!!!");
    var form = new formidable.IncomingForm();  
    form.uploadDir="public/images";
    //form.multiples = true;
    form.keepExtensions=true;

    form.parse(req, function(err, fields, files){ 
        console.log(fields);
        var path = files.portrait.path;
        console.log(path);
        var User = global.dbHandel.getModel('user'); 
        var email = req.session.user.email;
        // var upwd = req.body.psw;
        // var rpwd = req.body.confirmpsw;
        // // console.log("email: " + email);
        // // console.log("password: " + upwd);
        // // console.log("confirm password: " + rpwd);
        // //res.redirect("/ssignup");
        // var name = req.body.sname;
        // var gender = req.body.gender;
        // var contact = req.body.contact;
        // var university = req.body.university;
        // var type = "Student";
        //req.session.error = 'Create user success！';

        User.findOne({email: email},function(err,doc){
            console.log("in findone!")   
            if(err){ 
                res.send(500);
                req.session.error =  'Network error！';
                console.log("Network error");
            }else if(!doc){ 
                req.session.error = 'User does not exist！';
                res.send(500);
                console.log("user does not exist！");
            }else{ 
                if(fields.psw != fields.confirmpsw){
                    console.log('password inconsistant！');
                    req.session.error = 'password inconsistant！';
                    res.send(500);
                }
                else{
                    User.update({email: email},{
                        password: fields.psw,
                        name: fields.sname,
                        gender: fields.gender,
                        university: fields.university,
                        contact: fields.contact,
                        type: "Student",
                        portraitPath:path
                    },function(err,doc){ 
                        if (err) {
                            res.send(500);
                            //res.redirect("/ssignup");
                            

                            console.log(err);
                            console.log("failed anyway！");
                        } else {
                            req.session.error = 'Edit user info success！';
                            console.log("success!!!!!");
                            res.redirect("/sselfprofile");
                            //res.send(200);
                        }
                    });
                }           
            }
        });
    });
});
module.exports = router;