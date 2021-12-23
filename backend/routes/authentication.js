 const express = require("express");
 const User = require("../models/customer");
 const router = express.Router();
 const { forgotPassword, resetPassword } = require("../controllers/forgot_password");

 //  router.put("/changepassword", authController.changePassword);

 router.put("/forgot-password", forgotPassword)
 router.put("/reset-password/:utoken", resetPassword)

 module.exports = router;