var express = require('express')
var Customer = require('../models/customer')
var router = express.Router()
// const {crtlUser,login} = require("../controllers/authentication")
// const { check } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');




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


// router.post("/signup",[
//        check("name","name should be atleast 3 characters").isLength({min:3}),
//        check("email","email is required").isEmail(),
//       // check("contact","Phone number should contain 10 digits").isLength({min:10}),
//         check("password","password should be atleast 5 char").isLength({min:5})
// ],signup)
// router.get("/signout", signout)


//Post request created By rohit

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

// router.post('/authenticate', crtlUser.authenticate)


  //login-api Created by Rohit


router.post('/login', function(req,res,next){
  let demo = Customer.findOne({email: req.body.email}).exec();

  demo.then(function(doc){
    if(doc) {
      if(doc.isValid(req.body.password,)){
          //generate token
        let token = jwt.sign({username: doc.email},'secret', {expiresIn: '3h'});
        let newData = {
          message: 'Login Successfully',
          token
        }
        return res.status(200).json(newData);
      } else {
        return res.status(201).json({message:'Invalid Credentials'});
      }
    }
    else{
      return res.status(201).json({message : 'User email is not registered.'})
    }
  });

  demo.catch(function(err){
    return res.status(501).json({message: 'Some internal error'});
  })

})



module.exports = router;