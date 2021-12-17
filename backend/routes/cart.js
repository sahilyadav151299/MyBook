const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cart');

router.get('/', cartController.getCartData);

module.exports = router;