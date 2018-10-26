const firebase = require('firebase');
const api = require('./api');
const { config } = require('./config/firebase-config');

const { database } = firebase;
// firebase.initializeApp(config);

// api.getEvacReports();

console.log(faker.date.between('2015-01-01', '2018-01-10'))