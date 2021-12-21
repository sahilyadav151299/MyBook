const express = require('express');
const router = express.Router();

const packageController = require('../controllers/package');

router.get('/', packageController.getPackage);

router.post('/', packageController.buyPackage);

router.put('/', packageController.updateUserPack);

module.exports = router;