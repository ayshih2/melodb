const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const secrets = require('./secrets');


const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(secrets.mongo_connection, { useNewUrlParser: true });

var allowCrossDomain = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
};
app.use(allowCrossDomain);
require('./routes')(app, router);

app.listen(port, () => console.log(`Listening on port ${port}`));
