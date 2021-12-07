var mongoose = require('mongoose')
const Schema = mongoose.Schema

var customerSchema = new Schema({

    name:{
        type: String,
        required: true,
        maxlength: 50,
        trim: true
    },

    email:{
        type: String,
        trim: true,
        required: true,
        unique: true
    },

    encry_password:{
        type: String,
        required: true,
    },

    role:{
        type: Number,
        default: 0 
    },

    contact:{
        type: Number,
        required: true
    },

    create_at:{
        type: String,
        default: new Date()
    }
})

module.exports = mongoose.model('Customer',customerSchema)