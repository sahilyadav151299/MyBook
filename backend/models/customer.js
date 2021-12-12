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
        index: {
            unique: true, 
        },
        match:/[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    
    },

    password:{
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