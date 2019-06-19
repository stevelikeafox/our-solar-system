require('dotenv').config();

var path = require("path");
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

require('./server/api/auth.js')(app, passport);
require('./server/api/cards.js')(app);
require('./server/api/users.js')(app);
require('./server/api/questions.js')(app);


const questions = require('./server/models/questions');


if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
    // Handle React routing, return all requests to React app
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.listen(process.env.PORT || 3000, function () {
    console.log('Starting Server on: ' + PORT);
});

module.exports = app;