require('dotenv').config();


const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const flash = require('connect-flash');
const redis = require('redis');
const cookieParser = require('cookie-parser');

const session = require('express-session');
const redisStore = require('connect-redis')(session);


// var LocalStrategy = require('passport-local').Strategy;

const {
    MONGODB_URI,
    PORT,
    REDIS_URL,
    SESSION_SECRET
} = process.env;

const redisClient = redis.createClient(REDIS_URL);

mongoose.promise = global.Promise
const promise = mongoose.connect(MONGODB_URI, { useNewUrlParser: true }); // connect to our database
promise.then(function (db) {
    console.log('DATABASE CONNECTED!!');
}).catch(function (err) {
    console.log('CONNECTION ERROR', err);
});

/// config passport
require('./server/config/passport')(passport);

app.use(morgan('dev'));
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser());



app.use(session({
    secret: SESSION_SECRET,
    cookie: { maxAge: 60000 },
    store: new redisStore({
        client: redisClient,
        ttl: 260
    }),
    resave: false,
    saveUninitialized: false
})); // session secret

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

const cards = require('./server/models/cards');
const users = require('./server/models/users');
const questions = require('./server/models/questions');


require('./server/routes/routes.js')(app, passport);


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
            return data
        })
});

// app.post('/users', (req, response, next) => {
//     const postBody = req.body;
//     console.log('The Data:', postBody);
//     const newUser = new users(postBody);
//     console.log(newUser);
//     password = newUser.password;
//     newUser.password = newUser.generateHash(password);

//     newUser.save((err, result) => {
//         if (err) {
//             return response.status(500).send(err);
//         } else {
//             return response.status(201).json(result);
//         }

//     });
// });


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



if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
    // Handle React routing, return all requests to React app
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}




app.listen(PORT, function () {
    console.log('Starting Server on: ' + PORT);
});

module.exports = app;