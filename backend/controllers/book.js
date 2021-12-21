const BookModel = require('../models/book')
const fs = require('fs')
const path = require('path')

exports.getAllBooks = (req, res, next) => {

    BookModel.find()
        .then( data => res.json(data))
        .catch(err => console.log(err))
 }

exports.getOneBook = (req, res, next) => { 

    const bookId = req.params.id

    BookModel.findById(bookId,(error,data)=>{
                if(error){
                    return next (error)
                }else{
                    res.json(data)
                }  
            });
}

exports.addBook = (req, res, next) => {

    const data = req.body
    
    const bookObj = new BookModel({

        book_name : data.bookName,
        author : data.author,
        publish_date : data.publishDate,
        category_name : data.category,
        book_cover : {
            data: fs.readFileSync(path.join(__dirname.split('controllers')[0] + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        },
        total_book_rented: 0,
        total_book_quantity : data.totalQuantity,
    })
    
    bookObj.save()
        .then(() => res.json({status : 200, message : 'Book Added Succssefully!'}))
        .catch(() => res.json({status: 500, message: 'Internal Server Error'}))
}

exports.updateBook = (req, res, next) => {

    const id = req.params.id
    const bookData = req.body
    
    const book_name = bookData.bookName
    const author = bookData.author
    const category_name = bookData.category
    const publish_date = bookData.publishDate
    const total_book_quantity = bookData.totalQuantity

    
    if(req.file === undefined){
               
        BookModel.findByIdAndUpdate( id, { book_name, author, category_name, publish_date, total_book_quantity } )
            .then( () => res.json({ status : 200, message : 'Book Updated Successfully!' }))
            .catch(err => res.json({ errCode : 500, errMessage : 'Error In Updating Book Data!' }))

    }else{
        
        const book_cover = {
            data: fs.readFileSync(path.join(__dirname.split('controllers')[0] + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }

        BookModel.findByIdAndUpdate( id, { book_name, author, category_name, publish_date, total_book_quantity, book_cover } )
        .then( () => res.json({ status : 200, message : 'Book Updated Successfully!' }))
        .catch(err => res.json({ errCode : 500, errMessage : 'Error In Updating Address!' }))
    }

}

exports.deleteBook = (req, res, next) => {

    const bookId = req.params.id
    
    BookModel.findByIdAndDelete({ _id : bookId })
        .then(() => res.json({ status : 200, message : 'Book Deleted Successfully!'}))
        .catch(() => res.json({ status : 500, message : 'Internal Server Error' })) 
}




