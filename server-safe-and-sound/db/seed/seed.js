const firebase = require('firebase');
const faker = require('faker');
const admin = require('firebase-admin');
const { config, adminConfig } = require('../../config/firebase-config');
const { safeZone, buildingZone } = require('./zoneData');

const { database } = firebase;
firebase.initializeApp(config);
admin.initializeApp(adminConfig);

const allAuthUID = [];

function seedTestAdmin() {
  const email = 'admin@gmail.com';
  return firebase.auth().createUserWithEmailAndPassword(email, 'password')
    .then(({ user }) => {
      const { uid } = user;
      const newUser = {
        uid,
        email,
        fName: 'Test',
        lName: 'Admin',
        inBuilding: false,
        inSafeZone: true,
        markedSafe: null,
        markedInDanger: null,
        isAdmin: true,
        avatar: faker.image.avatar(),
        location: null,
        isFirstAider: true,
      };
      return database().ref(`/users/${uid}`)
        .set(newUser)
        .then(() => database().ref('/users').orderByKey().equalTo(uid)
          .once('value')
          .then((data) => {
            console.log(data.val(), '<<< User added to realtime db');
            return data;
          })
          .catch(err => console.log(err)))
    });
}

function seedTestUser() {
  const email = 'user@gmail.com';
  return firebase.auth().createUserWithEmailAndPassword(email, 'password')
    .then(({ user }) => {
      const { uid } = user;
      const newUser = {
        uid,
        email,
        fName: 'Test',
        lName: 'User',
        inBuilding: true,
        inSafeZone: false,
        markedSafe: null,
        avatar: faker.image.avatar(),
        markedInDanger: null,
        isAdmin: false,
        location: null,
        isFirstAider: false,
      };
      return database().ref(`/users/${uid}`)
        .set(newUser)
        .then(() => database().ref('/users').orderByKey().equalTo(uid)
          .once('value')
          .then((data) => {
            console.log(data.val());
            return data;
          })
          .catch(err => console.log(err)))
    })
}

function seedUsers(n) {
  for (let i = 0; i < n; i++) {
    firebase.auth().createUserWithEmailAndPassword(faker.internet.email(), "password")
      .then(({ user }) => {
        const { uid } = user;
        const newUser = {
          uid,
          fName: faker.name.firstName(),
          lName: faker.name.lastName(),
          location: null,
          markedSafe: null,
          markedInDanger: null,
          avatar: faker.image.avatar(),
          inBuilding: Math.floor(Math.random() * 10) <= 4,
          inSafeZone: Math.floor(Math.random() * 10) <= 6,
          isAdmin: Math.floor(Math.random() * 10) <= 3,
          isFirstAider: Math.floor(Math.random() * 10) <= 3,
        };
        return database().ref(`/users/${uid}`)
          .set(newUser)
          .then(() => database().ref('/users').orderByKey().equalTo(uid)
            .once('value')
            .then((data) => {
              console.log(data.val());
              return data;
            })
            .catch(err => console.log(err)))
      })
  }
}

function seedSite(safeZone, building) {
  database().ref('site').set({
    building,
    safeZone,
    isEmergency: false
  })
}

function eraseAndReseed(n) {
  database().ref('users').set({})
    .then(() => {
      admin.auth().listUsers(100)
        .then((listUsersResult) => {
          listUsersResult.users.forEach((userRecord) => {
            const { uid } = userRecord;
            allAuthUID.push(uid);
            admin.auth().deleteUser(userRecord.uid);
          });
        })
        .then(() => {
          console.log('DB erased');
          return seedTestAdmin();
        })
        .then(() => {
          console.log('Test Admin seeded');
          return seedTestUser();
        })
        .then(() => {
          console.log('Test User seeded');
          return seedUsers(n);
        })
        .then(() => {
          console.log(`${n} random users seeded`)
          return seedSite(safeZone, buildingZone);
        })
        .then(() => {
          console.log('Site information seeded')
        })
        .catch((error) => {
          console.log('Error erasing authenticated users:', error);
        })
    });
}


// eraseAndReseed(48)
seedSite(safeZone, buildingZone)
