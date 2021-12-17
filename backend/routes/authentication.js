const express = require("express");
const router = express.Router();

const authController = require("../controllers/authentication");


router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.put("/changepassword", authController.changePassword);

module.exports = router;
