var express = require('express');
var router = express.Router();

// router.get('/', function(req, res, next) {
//   res.render('ssignup');
// });

/* GET home page. */
router.get('/',function(req,res){   
    res.render("ssignup");
    console.log(req.session.user.email)
}).post('/', function(req,res){ 
    console.log("in post!!!!!!!!!");
    // res.send(500);
    // console.log("in post!!!!");
    var User = global.dbHandel.getModel('user');
    var email = req.body.email;
    var upwd = req.body.psw;
    var rpwd = req.body.confirmpsw;
    console.log("email: " + email);
    console.log("password: " + upwd);
    console.log("confirm password: " + rpwd);
    //res.redirect("/ssignup");
    var name = req.body.uname;
    var gender = req.body.gender;
    var university = req.body.university;
    var contact = req.body.contact;
    var type = "Student";
    //req.session.error = 'Create user success！';

    if(upwd !=rpwd){
        console.log('password inconsistant！');
        req.session.error = 'password inconsistant！';
        //res.send(500);
        res.redirect("/ssignup");
    }
    else{
        User.findOne({email: email},function(err,doc){
            console.log("in findone!")   
            if(err){ 
                res.send(500);
                req.session.error =  'Network error！';
                console.log("Network error");
            }else if(doc){ 
                req.session.error = 'User already exists！';
                res.send(500);
                console.log("user exists！");
            }else{ 
                User.create({                            
                    email: email,
                    password: upwd,
                    name: name,
                    gender: gender,
                    university: university,
                    contact: contact,
                    type: type
                },function(err,doc){ 
                    if (err) {
                        res.send(500);
                        //res.redirect("/ssignup");
                        

                        console.log(err);
                        console.log("fail to create database！");
                    } else {
                        req.session.error = 'Create user success！';
                        console.log("success!!!!!");
                        res.redirect("/mainpage");
                        //res.send(200);
                    }
                });          
            }
        });
    }
});
module.exports = router;
