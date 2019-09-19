const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
var CONFIG = require('./config.json');
var PORT = parseInt(CONFIG.server.port, 10);
var HOST_NAME = CONFIG.server.hostName;
var DATABASE_NAME = CONFIG.database.name;
var tokenMiddleware = require('./middleware/token');


mongoose.connect('mongodb://' + HOST_NAME + '/' + DATABASE_NAME)
.then((db) => {
    console.log("Connected correctly to server");
}, (err) => {
    console.log(err);
});


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());
app.use(morgan('dev'));


var usersRoutes = require('./routes/users');
app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
    // console.log(req.headers);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is express server</h1></body></html>');
});

var server = app.listen(PORT, function () {
    var host = server.address().address;
    var port = server.address().port;
  
    console.log('Server listening at http://%s:%s', host, port);
  });