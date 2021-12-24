const express = require("express");
const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;
const p = require("passport-local-mongoose");
const router = express.Router();
const User = require("../models/customer");

const jwt = require("jsonwebtoken")

router.post("/auth/register", async(req, res) => {
    //res.send('route hit ')
    try {
        // console.log(req.body);
        const newUser = new User({
            email: req.body.email,
            username: req.body.email,
            name: req.body.name,
            contact: req.body.contactNumber,
        });
        const regUser = await User.register(newUser, req.body.password);
        //console.log("regUser", regUser)
        //res.redirect('/login');
        res.json({
            status: 200,
            message: `${req.body.name} has been registered successfully`,
        });
    } catch (err) {
        res.json({ errCode: 409, error: err.message });
        //res.redirect('/register');
    }
});
// router.get("/auth/login", (req, res) => {
//     if (req.isAuthenticated()) res.redirect("/suggested-books");
//     else res.send("failed");
// });


router.post('/auth/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        //console.log(req.body)
        if (err) {
            console.log("error found")
            return next(err);
        }
        if (!user) {
            console.log("User not found")
            res.json({ errCode: 409, errMessage: info.message })
            return;
        }
        //console.log(user)
        const token = jwt.sign({
            userId: user._id,
            name: user.name,
            auth: true,
            role: user.role
        }, "sjfldjfdfs", { expiresIn: "1h" })
        res.json({ status: 200, userToken: token, message: "You have Successfully Logged In" })
    })(req, res, next);
})

router.put('/auth/changepassword', function(req, res) {
    if (!req.isAuthenticated()) {
        return res.status(403).json({
            success: false
        });
    }
    User.findById(req.params.user._id, function(err, user) {
        if (err) return res.status(200).json({ success: false });

        user.changePassword(req.body.oldPassword, req.body.newPassword, function(err) {

            if (err) {
                return res.status(200).json({
                    success: false
                });
            }

            user.setPassword(req.body.newPassword, function() {
                if (err || !user) {
                    return res.status(200).json({
                        success: false
                    })
                }

                user.save(function(err) {
                    if (err) return res.status(200).json({ success: false });

                    req.login(user, function(err) {
                        if (err) return res.status(200).json({ success: false });
                        return res.status(200).json({ success: true });
                    });

                });
            });


        });


    });
});


module.exports = router;