var express = require('express')
var Customer = require('../models/customer')
var router = express.Router()
const {signout,signup, login} = require("../controllers/authentication")
const { check } = require('express-validator');
const bcrypt = require('bcrypt');



function checkEmail(req,res,next){
  var email=req.body.email;
  var checkexitemail=Customer.findOne({email:email});
  checkexitemail.exec((err,data)=>{
 if(err) throw err;
 if(data){
  return res.status(200).json({
    msg:"Email Already Exists",
    results:data
});
 }
 next();
  });
}



router.get('/signup',(req,res)=>{
  Customer.find((err,docs)=>{
      if(!err) { res.send(docs);}
      else {console.log('Error in Retriving Employees : ' + JSON.stringify(err,undefined, 2));}
  });
});


router.post('/signup',checkEmail, (req,res)=> {

  bcrypt.hash(req.body.password, 10, function(err, hash) {


    if(err){
      res.status(400).json({
            msg:"Something Wrong, Try Later!",
            results:err
        });
    }else{

        var customer = new Customer({
          name : req.body.name,
          email: req.body.email,
          password: hash,
          contact: req.body.contactNumber,
          role : req.body.role
        });
        customer.save((err,doc)=>{
          if(!err){
            let newData = {
              msg: "User Created Successfully",
              name : req.body.name,
              email: req.body.email,
              password: hash,
              contact: req.body.contactNumber,
              role : req.body.role

            };
            res.send(newData);
            console.log('User Inserted Successfully');
          }
          else {console.log('Error in Employee Save :' + JSON.stringify(err,undefined,2));}
        })
    }
  });
});



// router.post("/login",[
//     check("email","email is required").isEmail(),
//     check("password","password field is required").isLength({min:3})
// ],login)

module.exports = router;