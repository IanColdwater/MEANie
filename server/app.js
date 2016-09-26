var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var mongoose = require('mongoose');

// connect to database; 27017 is default mongo port
mongoose.createConnection('localhost:/27017/test');

// new object constructor
var ourSchema = new mongoose.Schema({
    name: String,
    location: String
});

// create model for schema
var ourModel = mongoose.model('ourModel', ourSchema);

// send to index.html
app.get('/', function(req, res) {
    res.sendFile(path.resolve('public/index.html'));
});

app.get('/getRecords', function(req, res) {
    // get and send back all the things
    ourModel.find().then(function(data) {
        res.send(data);
    });
});

// spin up server
app.listen(8080, 'localhost', function(req, res) {
    console.log('listening on 8080');
});

app.post('/testPost', function(req, res) {
    console.log('req.body.name: ' + req.body.name);
    // retrieved the req.body

    // putting it into an object to be saved in the db
    var recordToAdd = {
        name: req.body.name,
        location: req.body.location
    };

    // create new record
    var newRecord = ourModel(recordToAdd);
    newRecord.save();
});

// use public folder
app.use(express.static('public'));
