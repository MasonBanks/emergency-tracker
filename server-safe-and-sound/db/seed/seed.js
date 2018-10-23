const firebase = require('firebase');
const faker = require('faker');
const admin = require('firebase-admin');
const { adminConfig } = require('../../config/firebase-config');
const { getUserById } = require('../../utils/createUser');
const { safeZone, buildingZone } = require('./zoneData');

const { database } = firebase;

admin.initializeApp(adminConfig);

const allAuthUID = [];

function seedAdmin() {
  const email = 'admin@gmail.com';
  firebase.auth().createUserWithEmailAndPassword(email, 'password')
    .then(({ user }) => {
      const { uid } = user;
      const newUser = {
        uid,
        firstName: 'Test',
        lastName: 'Admin',
        location: null,
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
  const email = 'user@gmail.com';
  firebase.auth().createUserWithEmailAndPassword(email, 'password')
    .then(({ user }) => {
      const { uid } = user;
      const newUser = {
        uid,
        firstName: 'Test',
        lastName: 'User',
        location: null,
        isAdmin: false,
        isFirstAider: false,
      };
      database().ref(`/users/${uid}`).set(newUser)
        .then(() => {
          getUserById(uid);
        })
        .catch(console.log);
    })
    .then(() => {
      for (let i = 0; i < n; i++) {
        firebase.auth().createUserWithEmailAndPassword(faker.internet.email(), faker.internet.password())
          .then(({ user }) => {
            const { uid } = user;
            const newUser = {
              uid,
              fName: faker.name.firstName(),
              lName: faker.name.lastName(),
              location: null,
              isAdmin: Math.floor(Math.random() * 10) <= 3,
              isFirstAider: Math.floor(Math.random() * 10) <= 3,
            };
            database().ref(`/users/${uid}`).set(newUser)
              .then(() => {
                getUserById(uid);
              })
              .catch(console.log);
          });
      }
    });
};

function seedSite(safeZone, buildingZone) {
  database().ref('site').set({
    buildingZone,
    safeZone,
    isEmergency: false
  })
}

function eraseAndReseed(n) {
  database().ref('users').set(null)
    .then(() => {
      admin.auth().listUsers(1000)
        .then((listUsersResult) => {
          listUsersResult.users.forEach((userRecord) => {
            const { uid } = userRecord;
            allAuthUID.push(uid);
            admin.auth().deleteUser(userRecord.uid);
          });
        })
        .then(() => {
          seedAdmin();
          console.log('DB erased');
        })
        .then(() => {
          console.log('Test Admin seeded');
          seedUsers(n);
        })
        .then(() => {
          console.log(`Test User Seeded... ${n} random users seeded`)
          seedSite(safeZone, buildingZone);
        })
        .then(() => {
          console.log('Site information seeded')
          seedSite(safeZone, buildingZone);
        })
        .catch((error) => {
          console.log('Error erasing authenticated users:', error);
        })
    });
}

eraseAndReseed(15);
