var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var Biodata = require('./api/model');
var bodyParser = require('body-parser');
var stats = require('./stats.js')

app.use(stats);

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/bio_db', {useNewUrlParser: true});

app.use(bodyParser.urlencoded({extended: true, parameterLimit: 1000000,  limit: '100mb'}));

app.use(bodyParser.raw({
  type: 'application/x-www-form-urlencoded',
  limit: '100mb'
}));

var routes = require('./api/route');
routes(app);

app.listen(port);

console.log('RESTful API up on port: ' + port);