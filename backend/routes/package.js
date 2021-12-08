const express = require('express');
const router = express.Router();

const packageController = require('../controllers/package');

router.get('/', packageController.getPackage);

module.exports = router;