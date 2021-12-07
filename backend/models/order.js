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

    flag:{
        type : Boolean
    },

    create_at:{
        type: String,
        default: new Date()
    }
})

module.exports = mongoose.model('Order',orderSchema)