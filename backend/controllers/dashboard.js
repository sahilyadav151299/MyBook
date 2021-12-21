const BookModel = require('../models/book')

exports.getSuggestedBooks = (req, res, next) => {

    BookModel.find({ $where: "this.total_book_quantity !==0 " })
        .then(allBooks => {
            res.status(200).send(allBooks);
        })
        .catch((err) => console.log(err));
}

exports.getFilteredBooks = (req, res, next) => {

    const filter = req.params.filterby

    BookModel.find({
            $or: [{ book_name: filter }, { author: filter }, { category_name: filter }],
            $where: "this.total_book_quantity !==0 "
        })
        .then((filtered_books) => {
            res.status(200).send(filtered_books);
        })
        .catch((err) => console.log(err));
}