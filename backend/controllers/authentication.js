const CustomerSchema = require('../models/customer')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = (req, res, next) => {
        
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const contact = req.body.contactNumber;

    CustomerSchema.findOne({ email: email })

        .then((user) => {

            if(user) {
              res.json({ errCode: 409, errMessage: "Email Already Exists!" })
            }else{

                bcrypt
                    .hash(password, 12)
                    .then((hashedPw) => {

                        const user = new CustomerSchema({

                        name : name,
                        email: email,
                        encry_password: hashedPw,
                        contact : contact
                        })

                        user.save()

                        res.json({ status : 200, message: "User Registered Successfully!" })
                    })
                    .catch(err => console.log(err)) 
                }  
            })
            .catch(err => console.log(err))                  
}


exports.login = (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;

    let loadedUser;

    CustomerSchema.findOne({ email: email })
        .then((user) => {
        
            if (!user) {
                res.json({ errCode: 422, errMessage: "Email Couldn't Be Found!" })
            }else{
                loadedUser = user;
                
                bcrypt.compare(password, user.encry_password)
                    .then((isEqual) => {
            
                        if (!isEqual) {
                            res.json({ errCode: 401, errMessage: "Wrong password!" });
                        }else{
                            console.log(loadedUser)    
                            const token = jwt.sign(
                                {
            
                                    userId: loadedUser._id,
                                    name: loadedUser.name,
                                    auth: true,
                                    role: loadedUser.role
                                },
                                "thisisthesupersecretkey", 
                                { expiresIn: '1h' }
                            )
                            
                            res.json({ status : 200, userToken : token, message : 'You have successfully logged in!'})
                        }
                    }).catch((err) => console.log(err))
            }        
        }).catch((err) => console.log(err))
}