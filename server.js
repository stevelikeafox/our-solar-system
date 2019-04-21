require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const parser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 4444;


app.use(parser.json());
app.use(parser.urlencoded({
    extended: false
}));
app.use(express.static('public'));

mongoose.Promise = global.Promise;
const dbConnection = mongoose.connect('mongodb://localhost/our-solar-system', {
    useNewUrlParser: true
});

dbConnection.then((db) => {
    console.log('Database Connected');
}).catch((err) => {
    console.log('Error database not connected', err);
});

const schema = mongoose.Schema;
const usersCollection = new schema({
    users: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
    }
});

const cardsCollection = new schema({
    cards: {
        cardNum: {
            type: String,
            required: true
        },
        fact: {
            type: String,
            required: true
        },
    }
});

const users = mongoose.model('users', usersCollection);
const cards = mongoose.model('cards', cardsCollection);

console.log("working");


app.post('/users', (req, res, next) => {
    const postBody = req.body;
    //   console.log('The Data:', postBody); // whoo whoo working now send to database
    const newUser = new users(postBody); // body of req to musiccollection schema

    // now save it **Note to self type music correctly LOL :{
    newUser.save((err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).json(result);
    });
});


app.post('/cards', (req, res, next) => {
    const postBody = req.body;
    //   console.log('The Data:', postBody); // whoo whoo working now send to database
    const newCard = new cards(postBody); // body of req to musiccollection schema

    // now save it **Note to self type music correctly LOL :{
    newCard.save((err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).json(result);
    });
});


app.listen(PORT, () => {
    console.log(`App Communicating on port: ${PORT}`)
});