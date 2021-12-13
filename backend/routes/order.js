const express = require('express');
const router = express.Router();

const orderController = require('../controllers/order');

router.get('/', orderController.getOrderHistory);

router.post('/', orderController.placeOrder);

module.exports = router;