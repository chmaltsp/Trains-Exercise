// Modules

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var morgan = require('morgan');
// Configuration 

//Config Files
var db = require('./config/db');

//Set up Port
var port = process.env.PORT || 8080;

//Connect to MongoDB

mongoose.connect(db.url, function (err) {
    if (err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

app.use('/api', router);



// Parse Application

app.use(bodyParser.json());

// Parse application/vnd.api as JSON

app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}));

// Parse application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({
    extended: true
}));

// Override with X-HTTP-Method-Override header in Request. simulate DELETE/PUT

app.use(methodOverride('X-HTTP-Method-Override'));

// Set static file directory for users

app.use(express.static(__dirname + '/public'));

// Routes

require('./app/routes')(app);

//start App

app.listen(port);

//Shoutout to User

console.log("magic happens on " + port);

//expose app

exports = module.exports = app;