const Customer = require("../models/customer")
const bcrypt = require("bcrypt")
const {validationResult} = require("express-validator")

exports.signout = (req, res) =>{
    res.json({
        message: "User signout"
    })
};
exports.signup = (req, res,next) =>{
   
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({
          error: errors.array()[0].msg
        })
    }

    var name  =req.body.name;
    var email = req.body.email
    var password = req.body.password
    var confirmPassword = req.body.confirmPassword
    var role = req.body.role
    var contact = req.body.contact

if(password !== confirmPassword){
    res.json({
    message:"Password not matched",
 })
}else{
    bcrypt.hash(password, 10,function(err, hash){
        if(err){
            return res.json({
                err:"Something went wrong",
                error : err
            })
        }else {
            var userDetails = new Customer({
                name: name,
                email: email,
                password: hash,
                role: role,
                contact: contact
            })
            userDetails.save()
            .then(doc=>{
                res.status(201).json({
                    message: "User Registered Successfully",
                    results: doc
                })
            })
            .catch(err=>{
                res.json(err)
            })
        }
    })    
}
}


