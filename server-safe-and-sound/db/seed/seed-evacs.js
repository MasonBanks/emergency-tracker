const firebase = require('firebase');
const faker = require('faker');
const admin = require('firebase-admin');
const moment = require('moment');
const { config, adminConfig } = require('../../config/firebase-config');
const { database } = firebase;
firebase.initializeApp(config);
admin.initializeApp(adminConfig);


const generateMarkedSafe = (timestamp, duration, n) => {
  let markedSafe = {};
  for (let i = 0; i < n; i++) {
    markedSafe[generateFakeUID()] = timestamp + Math.floor(Math.random() * duration)
  }
  return markedSafe
}

const generateInBuildingUsers = (n) => {
  let inBuildingUsers = {};
  for (let i = 0; i < n; i++) {
    inBuildingUsers[generateFakeUID()] = {
      fName: 'person'
    }
  }
  return inBuildingUsers
}

const generateFakeUID = () => {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 28; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

function seedEvacuation(timestamp, duration, n) {
  const admins = [
    '0WtT0BiPPwdtmbjq1NZPGI3E6xR2',
    'NTmsQsEJ1GeWIhrBIQ8vlENHaBq2',
    'kKzVagVqXERTTd7arpn6386wff03',
    'F3c5y2yuybX8ehGnTp2v8We4Ib93'
  ]
  let adminId = admins[Math.floor(Math.random() * 3)];
  let startTime = timestamp;
  let finishTime = startTime + duration;
  let inBuildingUsers = generateInBuildingUsers(n)
  let markedSafe = generateMarkedSafe(timestamp, duration, n);
  let drill = Math.random() * 100 > 50 ? true : false;
  let newEvac = {
    startTime,
    adminId,
    finishTime,
    inBuildingUsers,
    markedSafe,
    drill
  }
  return database().ref(`evacuations/${startTime}`).set(newEvac)
    .then(() => {
      console.log(`Database seeded with new evacuation event!`)
    })
    .catch((err) => {
      console.log(err)
    })
}

function seedXRandomEvacs(x) {
  for (let i = 0; i < x; i++) {
    let randomTimestamp = moment(faker.date.recent(2, '2018-10-20')).valueOf();
    let duration = Math.floor(1140000 - Math.random() * 840000)
    let n = 50 - Math.floor(Math.random() * 30)
    seedEvacuation(randomTimestamp, duration, n)
  }
}

seedXRandomEvacs(5)