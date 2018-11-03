const firebase = require('firebase');
const moment = require('moment');
const api = require('./api');
const { config } = require('./config/firebase-config');
const { HHMMSS, getAverageTimes } = require('./src/utils/timeUtils');

const { database } = firebase;
const { generateEvacReports } = require('./src/utils/generateEvacReports');
// firebase.initializeApp(config);

api.getEvacReports(generateEvacReports);

// api.getLatestEvacReport(generateEvacReports);
