const express = require('express');
const router = express.Router();

const orderController = require('../controllers/order');

router.get('/', orderController.getOrderHistory);

router.post('/', orderController.placeOrder);

router.post('/return-book', orderController.returnOrderedBooks);

module.exports = router;