const firebase = require('firebase');
const api = require('./api');
const { config } = require('./config/firebase-config');

const { database } = firebase;
// firebase.initializeApp(config);

api.getSafeList('HFEZc1g9aaPuWIF3RnWsy0I1yDB2');
