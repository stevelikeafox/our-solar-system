var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cardPosition: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);