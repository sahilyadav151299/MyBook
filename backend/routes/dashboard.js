const express = require('express');
const router = express.Router();

const homeController = require('../controllers/dashboard')

router.get('/suggested-books', homeController.getSuggestedBooks);

router.get('/filtered-books/:filterby', homeController.getFilteredBooks);

module.exports = router;
  