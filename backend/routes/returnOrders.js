const express = require('express');

const router = express.Router();



const returnordesController = require('../controllers/returnOrders');



router.get('/', returnordesController.openReturnOrders);

router.patch('/:id',returnordesController.returnOrderApprove)



module.exports = router;