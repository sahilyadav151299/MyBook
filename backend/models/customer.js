var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require("../config/config");

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

customerSchema.methods.isValid = function (password) {
    return bcrypt.compareSync(password, this.password);
};

customerSchema.methods.generateJwt = function(){
    return jwt.sign({_id: this._id},
        `${JWT_SECRET}`);
}

module.exports = mongoose.model('Customer',customerSchema)