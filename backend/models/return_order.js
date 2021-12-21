var mongoose = require('mongoose')
const Schema = mongoose.Schema

var returnOrderSchema = new Schema({

    customerId:{
        type: Schema.Types.ObjectId,
        ref: 'Customer'
    },

    return_book_order_Id:[ 
          
        { 
            bookId : { 
                type: Schema.Types.ObjectId, 
                ref: 'Book' 
            },

            orderId : {
                type: Schema.Types.ObjectId,
                ref : 'Order'
            }
        } 
    ],

    status:{
        type: String
    },

    pickup_address:{
        type: Object
    },

    create_at:{
        type: String,
        default: new Date()
    }
})

module.exports = mongoose.model('Return_Order',returnOrderSchema)