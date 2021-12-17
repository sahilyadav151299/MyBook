var mongoose = require('mongoose')
const Schema = mongoose.Schema

var customerPackageSchema = new Schema({

    customerId:{
        type: Schema.Types.ObjectId,
        ref: 'Customer'
    },

    packageId:{
        type: Schema.Types.ObjectId,
        ref: 'Package'
    },

    status:{
        type: Boolean
    },

    create_at:{
        type: String,
        default: new Date()
    }
})

module.exports = mongoose.model("Customer_Package",customerPackageSchema)