// const Customer = require("../models/customer")
// const bcrypt = require("bcrypt")
// const {validationResult} = require("express-validator");
// const router = require("../routes/authentication");

// exports.signout = (req, res) =>{
//     res.json({
//         message: "User signout"
//     })
// };
// exports.signup = (req, res,next) =>{
   
//     const errors = validationResult(req)
//     if(!errors.isEmpty()){
//         return res.status(422).json({
//           error: errors.array()[0].msg
//         })
//     }

//     var name  =req.body.name;
//     var email = req.body.email
//     var password = req.body.password
//     var confirmPassword = req.body.confirmPassword
//     var role = req.body.role
//     var contact = req.body.contact

    
    
// if(password !== confirmPassword){
//     res.json({
//     message:"Password not matched",
//  })
// }else{
//     bcrypt.hash(password, 10,function(err, hash){
//         if(err){
//             return res.json({
//                 err:"Something went wrong",
//                 error : err
//             })
//         }else {
//             var userDetails = new Customer({
//                 name: name,
//                 email: email,
//                 password: hash,
//                 role: role,
//                 contact: contact
//             })
//             userDetails.save()
//             .then(doc=>{
//                 res.status(201).json({
//                     message: "User Registered Successfully",
//                     results: doc
//                 })
//             })
//             .catch(err=>{
//                 res.json(err)
//             })
//         }
//     })    
// }
// }




// Code by simran



const Customer = require("../models/customer")
const bcrypt = require("bcrypt")
const {validationResult} = require("express-validator");
const { Mongoose } = require("mongoose");
const config = require("../config/config")
const jwt = require('jsonwebtoken')
const passport = require('passport');



exports.signup = (req, res,next) =>{

    var name  =req.body.name;
    var email = req.body.email
    var password = req.body.password
    var cpassword = req.body.confirmpassword
    var role = req.body.role
    var contact = req.body.contact

    Customer.find({email:req.body.email})
    .exec()
    .then(userDetails=>{
       if(userDetails.length>= 1){
           return res.status(409).json({
               message:"Mail already exists"
           });
       }else{
        bcrypt.hash(password, 10,function(err, hash){
            if(err){
               return res.json({
                    err:"Something went wrong..........",
                    error : err
                 });
               
             }else {
                var userDetails = new Customer({
            
                    name: name,
                    email: email,
                    password: hash,
                    role: role,
                    contact: contact
                });
                userDetails.save()
                .then(doc=>{
                    res.status(201).json({
                        message: "User Registered Successfully",
                        results: doc
                    });
                })
                .catch(err=>{
                    res.json(err);
                });
            }
        })
       }
    })       
}

// module.exports.login = (req, res,next) =>{
//     Customer.find({email:req.body.email})
//     .exec()
//     .then(userDetails=>{
//        if(userDetails.length< 1){
//            return res.status(401).json({
//                message:"Auth failed"
//            });
//        }
//        bcrypt.compareSync(req.body.password,userDetails[0].password,(err,result)=>{
//             if(err){
//                 return res.status(401).json({
//                     message:'Auth failed'//password is different
//                 });
//             }
//             if(result){
//                 const token =jwt.sign({
//                     email:userDetails[0].email,
//                     userDetailsId:userDetails[0]._id
//                 },
//                 "process.env.JWT_KEY",  //its a secret key!
//                 {
//                     expiresIn:"1h"
//                 }
//                 );
//                 return res.status(200).json({
//                     message:'Auth successful',//password+ email both match
//                     token:token
//                 });
//             }
//             res.status(401).json({
//                 message:'Auth failed'//if email is incorrect
//             });
//        });
//     })
// }

// module.exports.authenticate = (req, res, next) => {
//     //call for passport authentication
//     passport.authenticate('local', (err,customer,info)=>{
//         //error from passport middleware
//         if(err) return res.status(400).json(err);
//         //register user
//         else if (customer) return res.status(200).json({"token": customer.generateJwt()});
//         //unknown user or wrong password
//         else return res.status(404).json(info);
//     })
// }


