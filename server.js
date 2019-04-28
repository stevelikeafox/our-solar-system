require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const parser = require('body-parser');
const cards = require('./server/models/cards');
const users = require('./server/models/users');
const questions = require('./server/models/questions');

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

// console.log("working");


app.post('/users', (req, res, next) => {
    const postBody = req.body;
    //   console.log('The Data:', postBody);
    const newUser = new users(postBody); // body of req

    // now save
    newUser.save((err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).json(result);
    });
});


app.post('/cards', (req, res, next) => {
    const postBody = req.body;
    //   console.log('The Data:', postBody);
    const newCard = new cards(postBody); // body of req

    // now save
    newCard.save((err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).json(result);
    });
});

app.get('/cards', (req, res, next) => {
    cards.find({

    })
        .exec((err, result) => {
            if (err) return res.status(500).send(err);
            res.status(200).json(result);
            var data = result;

            console.log(data); //test
        })
});

app.post('/questions', (req, res, next) => {
    const postBody = req.body;
    //   console.log('The Data:', postBody);
    const newQuestion = new questions(postBody); // body of req

    // now save
    newQuestion.save((err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).json(result);
    });
});

app.get('/questions', (req, res, next) => {
    questions.find({

    })
        .exec((err, result) => {
            if (err) return res.status(500).send(err);
            res.status(200).json(result);
            var data = result;

            console.log(data); //test
        })
});



app.get('/users/:id', (req, res) => {
    var query = {};
    var id = req.params.id;

    if (id) {
        query._id = id
        console.log(query);
    }
    users.find(query).exec(function (err, users) {
        if (err) return res.status(500).send(err);
        res.status(200).json(users);
    });
});


app.listen(PORT, () => {
    console.log(`App Communicating on port: ${PORT}`)
});