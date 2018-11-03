const firebase = require('firebase');
const api = require('./api');
const { config } = require('./config/firebase-config');

const { database } = firebase;
const { generateEvacReports } = require('./src/utils/generateReport');
// firebase.initializeApp(config);

// api.getEvacReports(generateEvacReports);

api.getLatestEvacReport(generateEvacReports);