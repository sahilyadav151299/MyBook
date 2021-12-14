const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

var Customer = require('../models/customer');

passport.use(
    new localStrategy({usernameField: 'email'},
        (username,password,done) => {
            Customer.findOne({email : username},
                    (err,customer) =>{
                        if(err)
                            return done(err);
                            //unkonwn user
                        else if(!customer)
                            return done(null,false,{message: 'Email is not registered'});
                        else if(!customer.verifyPassword(password))
                            return done(null, false, {message: 'Wrong password.'});
                        else
                            return done(null,customer);
                    });
        })
);