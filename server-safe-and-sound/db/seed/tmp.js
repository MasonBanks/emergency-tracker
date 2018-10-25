const firebase = require('firebase');
const faker = require('faker');
const admin = require('firebase-admin');
const moment = require('moment');
const { config, adminConfig } = require('../../config/firebase-config');
const { database } = firebase;
firebase.initializeApp(config);
admin.initializeApp(adminConfig);

const generateMarkedSafe = (timestamp, duration, n) => {
  let markedSafe = [];
  for (let i = 0; i < n; i++) {
    markedSafe.push(timestamp + Math.floor(Math.random() * duration))
  }
  return markedSafe
}

const generateInBuildingUsers = (n) => {
  let inBuildingUsers = [];
  for (let i = 0; i < n; i++) {
    inBuildingUsers.push(Math.random().toString(36).substring(2, 28))
  }
  return inBuildingUsers
}

const admins = [
  '0WtT0BiPPwdtmbjq1NZPGI3E6xR2',
  'NTmsQsEJ1GeWIhrBIQ8vlENHaBq2',
  'kKzVagVqXERTTd7arpn6386wff03',
  'F3c5y2yuybX8ehGnTp2v8We4Ib93'
]

function seedEvacuation(timestamp, duration, n) {
  let adminId = admins[Math.floor(Math.random() * 4)];
  let startTime = timestamp;
  let finishTime = startTime + duration;
  let inBuildingUsers = generateInBuildingUsers(n)
  let markedSafe = generateMarkedSafe(timestamp, duration, n);
  let drill = Math.random() * 100 > 50 ? true : false;
  let newEvac = {
    [startTime]: {
      adminId,
      finishTime,
      inBuildingUsers,
      markedSafe,
      drill
    }
  }
  return database().ref(`evacuations/${startTime}`).set({
    adminId,
    finishTime,
    inBuildingUsers,
    markedSafe,
    drill
  })
    .then(() => {
      console.log('Database seeded with new evacuation event!')
    })
    .catch((err) => {
      console.log(err)
    })
}

let randomTimestamp = moment(faker.date.recent(2, '2018-10-20')).valueOf();

console.log(seedEvacuation(randomTimestamp, 977000, 31))