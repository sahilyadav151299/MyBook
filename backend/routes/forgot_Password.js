// It has both things forgot password + reset Password
const express = require("express");
const router = express.Router();

const { forgotPassword, resetPassword } = require("../controllers/forgot_password");

router.put("/forgot-password", forgotPassword)
router.put("/reset-password", resetPassword)

module.exports = router;