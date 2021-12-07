var mongoose = require('mongoose')
const Schema = mongoose.Schema

var addressSchema = new Schema({

    address:{
        type: String,
        trim: true,
    },

    city:{
        type: String,
        trim: true,
    },

    state:{
        type: String,
        trim: true,
    },

    pincode:{
        type: Number,
        trim: true,
        required: true,
    },

    create_at:{
        type: String,
        default: new Date()
    },

    customerId:{
        type: Schema.Types.ObjectId,
        ref: 'Customer'
    }
})

module.exports = mongoose.model('Address',addressSchema);
