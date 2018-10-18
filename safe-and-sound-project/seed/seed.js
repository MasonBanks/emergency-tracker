const firebase = require('firebase');
const faker = require('faker');
const admin = require('firebase-admin');
const { config, adminConfig } = require('../config/firebase-config');
const { createUser, getUserById } = require('../api');
const { safeZone, buildingZone } = require('./zoneData');
const { database } = firebase;
const randomOneThirdTrueBool = Math.floor(Math.random() * 10) <= 3;

admin.initializeApp(adminConfig);
const allAuthUID = [];
function eraseAllAuth() {
  admin.auth().listUsers(1000)
    .then(function (listUsersResult) {
      listUsersResult.users.forEach(function (userRecord) {
        let { uid } = userRecord;
        admin.auth().deleteUser(userRecord.uid)
      });
    })
    .then(() => {
      console.log("Authenticated users erased ")
    })
    .catch(function (error) {
      console.log("Error erasing authenticated users:", error);
    });
}

function seedAdmin() {
  const email = "teamsafeandsound@gmail.com";
  firebase.auth().createUserWithEmailAndPassword(email, "password")
    .then(({ user }) => {
      const { uid } = user;
      const newUser = {
        uid,
        firstName: "Bob",
        lastName: "Smith",
        email,
        inBuilding: false,
        inSafeZone: false,
        isAdmin: true,
        isFirstAider: true,
      };
      database().ref(`/users/${uid}`).set(newUser)
        .then(() => {
          getUserById(uid);
        })
        .catch(console.log);
    })
    .catch((error) => {
      if (error.code === 'auth/weak-password') {
        console.log('The password is too weak.');
      } else {
        console.log(error.message);
      }
      console.log(error);
    });
}


function seedUsers(n) {
  database().ref('/users').set(null)
    .then(console.log());
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



eraseAllAuth();
seedAdmin();
seedUsers(10);
