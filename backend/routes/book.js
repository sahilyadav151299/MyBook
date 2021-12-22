const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book')

router.get('/book-list', bookController.getAllBooks);

router.get('/get-one-book/:id', bookController.getOneBook);

router.post('/add-book', bookController.addBook);

router.put('/update-book/:id', bookController.updateBook);

router.delete('/delete-book/:id', bookController.deleteBook);

module.exports = router;