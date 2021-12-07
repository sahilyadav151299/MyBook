var mongoose = require('mongoose')
const Schema = mongoose.Schema

var bookSchema = new Schema({

    author: {
        type: String,
        trim: true,
    },

    quantity: {
        type: Number,
    },

    publish_date:{
        type: String
    },

    book_cover: {
        type: Buffer
    },

    flag:{               
        type: Boolean
    },

    create_at :{
        type: String,
        default: new Date()
    },

    categoryId:{
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }

})

module.exports = mongoose.model('Book',bookSchema);