const firebase = require('firebase');
const api = require('./api');
const { config } = require('./config/firebase-config');

const { database } = firebase;
// firebase.initializeApp(config);

// api.getUserById('pI1EYTutWqZNSMTBFjTwF7hAdfC2');


createNewEvacuation('person', 123);
