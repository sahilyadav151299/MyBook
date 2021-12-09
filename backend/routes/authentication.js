var express = require('express')
var router = express.Router()
const {signout,signup, login} = require("../controllers/authentication")
const { check } = require('express-validator');

router.post("/signup",[
      check("name","name should be atleast 3 characters").isLength({min:3}),
      check("email","email is required").isEmail(),
     // check("contact","Phone number should contain 10 digits").isLength({min:10}),
       check("password","password should be atleast 5 char").isLength({min:5})
],signup)
router.get("/signout", signout)

// router.post("/login",[
//     check("email","email is required").isEmail(),
//     check("password","password field is required").isLength({min:3})
// ],login)

module.exports = router;