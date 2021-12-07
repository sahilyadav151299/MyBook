var mongoose = require('mongoose')
const Schema = mongoose.Schema

var rentedBookSchema = Schema({

    orderId: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
    },

    bookId: {
        type: Schema.Types.ObjectId,
        ref: 'Book'
    },
    
    flag: {
        type: Boolean
    },

    create_at: {
        type: String,
        default: new Date()
    }
})

module.exports = mongoose.model('Rented_Book', rentedBookSchema);
