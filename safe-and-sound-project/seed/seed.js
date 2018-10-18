const firebase = require('firebase');
const faker = require('faker');
const { config } = require('../config/firebase-config');

const { database } = firebase;
const { createUser } = require('../api');
const { safeZone, buildingZone } = require('./zoneData');

const randomOneThirdTrueBool = Math.floor(Math.random() * 10) <= 3;

// firebase.initializeApp(config);

function seedAdmin() {
  return createUser('Bob', 'Safe', 'teamsafeandsound@gmail.com', 'safeandsound');
}

function seedUsers(n) {
  for (let i = 0; i < n; i++) {
    firebase.auth().createUserWithEmailAndPassword(faker.internet.email(), faker.internet.password())
      .then(({ user }) => {
        const { uid } = user;
        const newUser = {
          uid,
          fName: faker.name.firstName(),
          lName: faker.name.lastName(),
          inBuilding: false,
          inSafeZone: false,
          isAdmin: randomOneThirdTrueBool,
          isFirstAider: randomOneThirdTrueBool,
        };
        database().ref('/users').push(newUser)
          .then(({ path }) => console.log(path));
      });
  }
}

seedAdmin();
seedUsers(10);
