const express = require('express');
const router = express.Router();

const accept_order_byAdminController = require('../controllers/accept_order_byAdmin');

router.get('/', accept_order_byAdminController.placedorders);
router.patch('/:id', accept_order_byAdminController.do_deliver);


module.exports = router;