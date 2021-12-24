const mongoose = require("mongoose");
const PassportLocalMongoose = require("passport-local-mongoose");
const dotenv = require("dotenv");
dotenv.config();
const CustomerSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },

    contact: {
        type: Number,
        required: true,
    },
    role: {
        type: Number,
        default: 0
    },
    create_at: {
        type: String,
        default: new Date(),
    },
    resetLink: {
        data: String,
        default: ''
    }
});

CustomerSchema.plugin(PassportLocalMongoose);
const User = new mongoose.model("Customer", CustomerSchema);
module.exports = User;