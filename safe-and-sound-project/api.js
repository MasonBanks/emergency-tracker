const firebase = require('firebase');
const firebaseConfig = require('./config');

firebase.initializeApp(firebaseConfig);
const database = firebase.database;

const enterBuilding = (bool) => {
  database().ref('/users/0/').update({ inBuilding: bool });
}

const enterSafeZone = (bool) => {
  database().ref('/users/0/').update({ inSafeZone: bool });
}

module.exports = { enterBuilding, exitBuilding, enterSafeZone, exitSafeZone }