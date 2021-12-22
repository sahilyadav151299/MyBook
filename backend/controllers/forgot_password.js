const nodemailer = require("nodemailer");
const User = require('../models/customer')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const dotenv = require("dotenv");
dotenv.config();

exports.forgotPassword = (req, res) => {
    const { email } = req.body
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.json({ status: 409, error: "SORRY !! This email is not registerd in our Database" })
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' })
            //TODO:
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            }
        });
        var mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Complete your  password reset request',
            html: `<h>Click the link to reset your password</h1>
            <p>http://localhost:3000/reset-password/${token} </p>`
        }
        return user.updateOne({ resetLink: token }, function(err, success) {
            if (err) {
                return res.json({ status: 409, error: err })
            } else {
                transporter.sendMail(mailOptions, function(err, info) {
                    if (err) {
                        res.send(err)
                        console.log(err);
                    } else {
                        res.send('Link has been sent to your email')
                        console.log("email sent: " + info.response)
                    }
                })
            }
        })
    })
}
exports.resetPassword = (req, res) => {
    const { newPass } = req.body;
    const utoken = req.params.utoken
    console.log('utoken ', utoken)
    if (utoken) {
        jwt.verify(utoken, process.env.JWT_SECRET, (err, decodedData) => {
            if (err) {
                return res.json({
                    status: 401,
                    error: "Incorrect token or link is expired"
                })
            }
            //verfying the user based on reset link
            User.findOne({ resetLink: utoken }, (err, user) => {
                if (err || !user) {
                    return res.json({ status: 409, error: "user with this token is not exists" })
                }
                const obj = {
                    password: newPass,
                    // resetLink: ''
                }
                user = _.extend(user, obj);
                user.save((err, result) => {
                    if (err) {
                        return res.json({ err: "reset password Error" })
                    } else {
                        user.updateOne({ password: this.newPass })
                        return res.json({ message: 'Your password has been changed', newPassword: newPass })
                    }
                })
            })
        })
    } else {
        res.json({ err: "Authentication error!! please check your link once " })
    }
}