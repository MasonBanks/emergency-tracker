const express = require('express');
const bodyParser = require('body-parser');
const firebase = require('firebase');
const { config } = require('./config/firebase-config');
firebase.initializeApp(config);
const app = express();
const apiRouter = require('./routers/api-router');

app.use(bodyParser.json());

app.use('/api', apiRouter);

module.exports = app;