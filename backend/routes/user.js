const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

router.post('/address', userController.changeAddres);

router.get('/address', userController.getAddress);

module.exports = router;