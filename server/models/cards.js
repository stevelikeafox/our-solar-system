const mongoose = require('mongoose');


const cardsCollection = new mongoose.Schema({

    cardNum: {
        type: Number,
        required: true
    },
    cardTitle: {
        type: String,
        required: true
    },
    fact: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    video: {
        type: String,
        required: false
    },
    moreInfo: {
        type: String,
        required: false
    },
    animation: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('cards', cardsCollection);
