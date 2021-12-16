const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

router.post('/address', userController.changeAddres);

router.get('/address', userController.getAddress);

router.get('/profile', userController.getUserProfile);

router.put('/profile-update', userController.updateProfile);

module.exports = router;