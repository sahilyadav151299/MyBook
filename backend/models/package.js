var mongoose = require('mongoose')
const Schema = mongoose.Schema

var packageSchema = new Schema({
    
    package_name: {
        type: String
    },

    max_book: {
        type: Number
    },

    price: {
        type: Number
    },

    validity: {
        type: Number
    },

    create_at: {
        type: String,
        default: new Date()
    }
})
module.exports = mongoose.model('Package',packageSchema)