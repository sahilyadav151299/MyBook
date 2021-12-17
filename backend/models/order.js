var mongoose = require('mongoose')
const Schema = mongoose.Schema

var orderSchema = new Schema({

    customerId:{
        type: Schema.Types.ObjectId,
        ref: 'Customer'
    },

    customerPackageId:{
        type: Schema.Types.ObjectId,
        ref: 'Customer_Package'
    },

    book_rented:[ 
          
        { bookId: { type: Schema.Types.ObjectId, ref: 'Book' } } 
    ],

    flag:{
        type: String
    },

    create_at:{
        type: String,
        default: new Date()
    }
})

module.exports = mongoose.model('Order',orderSchema)