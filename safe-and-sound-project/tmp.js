const firebase = require('firebase');
const moment = require('moment');
const api = require('./api');
const { config } = require('./config/firebase-config');
const { HHMMSS, getAverageTimes } = require('./src/utils/timeUtils');

const { database } = firebase;
// firebase.initializeApp(config);

// api.getEvacReports();

api.generateLatestEvacReport();
