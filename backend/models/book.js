var mongoose = require('mongoose')
const Schema = mongoose.Schema

var bookSchema = new Schema({

    book_name: {
        type: String,
        trim: true,
    },

    author: {
        type: String,
        trim: true,
    },

    publish_date:{
        type: String
    },

    book_cover: {
        data: Buffer,
        contentType: String
    },

    total_book_quantity: {
        type: Number,
    },

    total_book_rented: {
        type: Number,
    },

    category_name:{
        type: String
    },
   
    create_at :{
        type: String,
        default: new Date()
    },
})

module.exports = mongoose.model('Book',bookSchema);