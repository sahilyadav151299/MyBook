const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/customer");
const homeController = require('../controllers/dashboard')


const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

router.post("/auth/register", async(req, res) => {
    //res.send('route hit ')
    try {
        console.log(req.body)
        const newUser = new User({
            email: req.body.email,
            username: req.body.email, // 
            name: req.body.name,
            contactNo: req.body.contactNumber
        });
        const regUser = await User.register(newUser, req.body.password);
        //console.log("regUser", regUser)
        //res.redirect('/login');
        res.json({
            status: 200,
            message: `${req.body.name} has been registered successfully`
        });
    } catch (err) {
        res.json({ errCode: 409, error: err.message });
        //res.redirect('/register');
    }
});
// router.get('/auth/login', (req, res) => {
//     if (req.isAuthenticated()) res.redirect("/suggested-books");
//     else
//         res.render('failed');
// });

// router.post('/auth/login',
//     // passport.authenticate('local', {
//     //     failureRedirect: '/auth/login',
//     //     successRedirect: '/suggested-books'
//     // }),
//     (req, res) => {
//         console.log("auth hit ", req.body)
//             //res.redirect("/");
//         const token = jwt.sign({ _id: User._id }, "sssghhh");
//         //put token in cookie
//         res.cookie("token", token, { expire: new Date() + 9999 });
//         //send response to frontend
//         // const { _id, username, email, role } = User
//         res.json({ token: token, message: "user login successfully", status: 200 });

//     }
// );


// router.post('/auth/login', (req, res, ) => {
//     passport.authenticate(
//         'local', { session: false },
//         (error, user) => {

//             if (error || !user) {
//                 res.status(400).json({ error });
//             }

//             /** This is what ends up in our JWT */
//             const payload = {
//                 username: user.email,
//                 expires: Date.now() + parseInt(30000),
//             };

//             /** assigns payload to req.user */
//             req.login(payload, { session: false }, (error) => {
//                 if (error) {
//                     return res.status(400).send({ error });
//                 }

//                 /** generate a signed json web token and return it in the response */
//                 const token = jwt.sign(JSON.stringify(payload), process.env.JWT_SECRET);
//                 //console.log('token'+token);
//                 /** assign our jwt to the cookie */
//                 //res.cookie('jwt', token, { httpOnly: true, secure: true });
//                 //res.cookie('jwt', token);
//                 //res.send(token);
//                 //res.status(200).send(payload.username);
//                 res.redirect('/suggested-books');
//             });
//         },
//     )(req, res);
// };

// router.get("/auth/login", (req, res) => {
//     res.json({ msg: " Failed: You are in login Page" });
// });
router.get("/dashboard", (req, res) => {
    res.json({ msg: " You are in dashboard Page" });
});

router.get('/suggested-books', homeController.getSuggestedBooks);

module.exports = router;