const firebase = require('firebase');
const faker = require('faker');
const { config } = require('../config/firebase-config');
const { safeZone, buildingZone } = require('./zoneData');

const { database } = firebase;
firebase.initializeApp(config);

function seedGuestAdmin() {
  const guestAdmin = {
    email: 'guest@admin.com',
    fName: 'Guest',
    lName: 'Admin',
  };

  return firebase.auth().createUserWithEmailAndPassword(guestAdmin.email, 'password')
    .then(({ user }) => {
      const { uid } = user;
      const newUser = {
        uid,
        email: guestAdmin.email,
        fName: guestAdmin.fName,
        lName: guestAdmin.lName,
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
          .catch(err => console.log(err)));
    });
}

function seedGuestUser() {
  const guestUser = {
    email: 'guest@user.com',
    fName: 'Guest',
    lName: 'User',
  };

  return firebase.auth().createUserWithEmailAndPassword(guestUser.email, 'password')
    .then(({ user }) => {
      const { uid } = user;

      const newUser = {
        uid,
        email: guestUser.email,
        fName: guestUser.fName,
        lName: guestUser.lName,
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
          .catch(err => console.log(err)));
    });
}

function seedUsers(n) {
  for (let i = 0; i < n; i++) {
    const email = faker.internet.email();
    firebase.auth().createUserWithEmailAndPassword(email, 'password')
      .then(({ user }) => {
        const { uid } = user;
        const newUser = {
          uid,
          fName: faker.name.firstName(),
          lName: faker.name.lastName(),
          email,
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
            .catch(err => console.log(err)));
      });
  }
}

function seedSite(safeZone, building) {
  database().ref('site').set({
    building,
    safeZone,
    isEmergency: false,
  })
    .then(() => {
      console.log('Site seeded with zone coordinates');
    });
}


function seedDemoDb(n) { // n = no of users to seed
  return seedGuestAdmin()
    .then(() => {
      console.log('Guest Admin seeded');
      return seedGuestUser();
    })
    .then(() => {
      console.log('Guest User seeded');
      return seedUsers(n);
    })
    .then(() => {
      console.log(`${n} random users seeded`);
      return seedSite(safeZone, buildingZone);
    })
    .then(() => {
      console.log('Site information seeded');
    })
    .catch((error) => {
      console.log(error);
    });
}


seedDemoDb(20);
