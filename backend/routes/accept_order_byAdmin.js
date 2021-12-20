const express = require('express');
const router = express.Router();

const accept_order_byAdminController = require('../controllers/accept_order_byAdmin');

router.get('/', accept_order_byAdminController.openOrders);



module.exports = router;