const firebase = require('firebase');
const faker = require('faker');
const admin = require('firebase-admin');
const { config, adminConfig } = require('../../config/firebase-config');
const { database } = firebase;
firebase.initializeApp(config);
admin.initializeApp(adminConfig);

const generateMarkedSafe = (n) => {
  let markedSafe = [];
  for (let i = 0; i < n; i++) {
    markedSafe.push(moment(faker.date.recent(2, '2018-10-20'), 'x'))
  }
  return markedSafe
}

function seedEvacuation(n) {
  let adminId = faker.finance.bitcoinAddress();
  let startTime = moment(faker.date.recent(2, '2018-10-20'), 'x');
  let finishTime = startTime + Math.floor(Math.random * 2100000);
  let inBuildingUsers = Array.apply(faker.finance.bitcoinAddress(), new Array(n))
  let markedSafe = generateMarkedSafe(n);
  let drill = Math.random() * 100 > 50 ? true : false;
  return database().ref(`evacuations/${startTime}`).set({
    start
  })
}