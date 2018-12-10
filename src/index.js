const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const configEnv = require('./helpers/readConfig');
const connectMongo = require('./helpers/connectMongo');
const app = express();

configEnv.readEnv();

app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    parameterLimit: 100000,
    limit: '50mb',
    extended: false
}));

app.use(cors());

connectMongo.init('models');

module.exports = app;