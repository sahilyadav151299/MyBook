var mongoose = require('mongoose')
const Schema = mongoose.Schema

var categorySchema = new Schema({
    
    category_name:{
        type: String
    },

    create_at:{
        type: String,
        default: new Date()
    }
})

module.exports = mongoose.model("Category",categorySchema);