const BookModel = require('../models/book')

exports.getSuggestedBooks = (req, res, next) => {

    BookModel.find({ $where: " this.total_book_quantity != this.total_book_rented " })
        .then( allBooks => {
            res.status(200).send(allBooks);
        })
        .catch( (err) => console.log(err));
}



exports.getFilteredBooks = (req,res,next) => {

    const filter = req.params.filterby

    BookModel.find( { $text: { $search:filter} }, (err,filtered_books) => {
        if(err){
            res.send("No results for search");
        }
        else{
            res.send(filtered_books);
        }

    })
}


