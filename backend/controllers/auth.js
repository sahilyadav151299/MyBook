const express = require("express");
const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;
const p = require("passport-local-mongoose");
const router = express.Router();
const User = require("../models/customer");
const homeController = require("../controllers/dashboard");
var flash = require("connect-flash");

const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

router.post("/auth/register", async(req, res) => {
    //res.send('route hit ')
    try {
        console.log(req.body);
        const newUser = new User({
            email: req.body.email,
            username: req.body.email, //
            name: req.body.name,
            contactNo: req.body.contactNumber,
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
router.get("/auth/login", (req, res) => {
    if (req.isAuthenticated()) res.redirect("/suggested-books");
    else res.send("failed");
});


// router.post('/auth/login', (req, res) => {
//     passport.authenticate(
//         'local', { session: false },
//         (error, user) => {

//             if (error || !user) {
//                 res.status(400).json({ errMessage: error });
//             }

//             /** This is what ends up in our JWT */
//             const payload = {
//                 username: user.username,
//                 expires: Date.now() + parseInt(30000),
//             };

//             /** assigns payload to req.user */
//             req.login(payload, { session: false }, (error) => {
//                 if (error) {
//                     res.status(400).send({ error });
//                 }

//                 /** generate a signed json web token and return it in the response */
//                 const token = jwt.sign(JSON.stringify(payload), keys.secret);
//                 //console.log('token'+token);
//                 /** assign our jwt to the cookie */
//                 //res.cookie('jwt', token, { httpOnly: true, secure: true });
//                 res.cookie('jwt', token);
//                 //res.send(token);
//                 //res.status(200).send(payload.username);
//                 res.redirect("/suggested-books");
//             });
//         },
//     )(req, res);
// });

router.post(
    "/auth/login", (req, res, next) => {
        console.log("auth hit ", req.body);
        next();
    },
    passport.authenticate("local", {
            failureRedirect: "/auth/register",
            successRedirect: "/suggested-books", //re-direction issue
            // console.log('authentication called')
        }

    )
);



// passport.use(
//     new LocalStrategy(function(email, password, done) {
//         User.findOne({ email: email }, function(err, user) {
//             if (err) {
//                 return done(err);
//             }
//             if (!user) {
//                 return done(null, false);
//             }
//             if (!user.verifyPassword(password)) {
//                 return done(null, false);
//             }
//             return done(null, user);
//         });
//     })
// );

// router.post("/auth/login", function(req, res, next) {
//     console.log(req.body);
//     passport.authenticate("local", function(err, user, info) {
//         if (err) {
//             console.log("err:" + err);
//         }
//         if (!user) {
//             console.log("info :" + info.message);
//             return;
//         }
//         //   createSendToken(req.user, res);
//         console.log(user);
//     })(req, res, next);
// });

router.get("/suggested-books", homeController.getSuggestedBooks);

module.exports = router;