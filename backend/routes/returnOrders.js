const express = require('express');

const router = express.Router();



const returnordesController = require('../controllers/returnOrders');



router.get('/', returnordesController.openReturnOrders);





module.exports = router;