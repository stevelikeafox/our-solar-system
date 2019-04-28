const mongoose = require('mongoose');


const questionsCollection = new mongoose.Schema({

    questionNum: {
        type: Number,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    answer1: {
        type: String,
        required: true
    },
    answer2: {
        type: String,
        required: true
    },
    answer3: {
        type: String,
        required: false
    },
    correctAnswer: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('questions', questionsCollection);