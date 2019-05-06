require('dotenv').config();


const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');


const {
    MONGODB_URI,
    PORT,
} = process.env;



mongoose.promise = global.Promise
const promise = mongoose.connect(MONGODB_URI, { useNewUrlParser: true }); // connect to our database
promise.then(function (db) {
    console.log('DATABASE CONNECTED!!');
}).catch(function (err) {
    console.log('CONNECTION ERROR', err);
});

app.use(morgan('dev'));
app.use(bodyParser());

const cards = require('./server/models/cards');
const users = require('./server/models/users');
const questions = require('./server/models/questions');


app.post('/cards', (req, res, next) => {
    const postBody = req.body;
    const newCard = new cards(postBody);


    newCard.save((err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).json(result);
    });
});

app.put('/cards/:cardid', (req, res, next) => {
    const updateCard = req.params.cardid;
    console.log(updateCard);
    cards.update({
        _id: updateCard,
    }, req.body, function (err, resp) {
        if (err) return res.status(500).send(err);
        res.sendStatus(200);
    })
});

app.get('/cards', (req, res, next) => {
    cards.find({

    })
        .exec((err, result) => {
            if (err) return res.status(500).send(err);
            res.status(200).json(result);
            var data = result;

        })
});

app.post('/users', (req, res, next) => {
    const postBody = req.body;
    console.log('The Data:', postBody);
    const newUser = new users(postBody);


    newUser.save((err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).json(result);
    });
});


app.get('/users/:id', (req, res) => {
    var query = {};
    var id = req.params.id;

    if (id) {
        query._id = id

    }
    users.find(query).exec(function (err, users) {
        if (err) return res.status(500).send(err);
        res.status(200).json(users);
    });
});


app.put('/users/:userid', (req, res, next) => {
    const updateUser = req.params.userid;
    console.log(updateUser);
    users.update({
        _id: updateUser,
    }, req.body, function (err, resp) {
        if (err) return res.status(500).send(err);
        res.sendStatus(200);
    })
});


app.delete('/cards/:cardid', (req, res, next) => {
    const deleteCard = req.params.cardid;
    console.log(deleteCard);
    cards.deleteOne({
        _id: deleteCard
    }, (err, resp) => {
        if (err) return res.status(500).send(err);
        res.sendStatus(204);
    })
});


app.listen(PORT, function () {
    console.log('The magic happens on port ' + PORT);
});

module.exports = app;