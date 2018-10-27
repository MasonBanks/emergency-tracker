const firebase = require('firebase');
const faker = require('faker');
const admin = require('firebase-admin');
const { config, adminConfig } = require('../../config/firebase-config');
const { safeZone, buildingZone } = require('./zoneData');

const { database } = firebase;
firebase.initializeApp(config);
admin.initializeApp(adminConfig);

const allAuthUID = [];

function eraseDb() {
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
    })
}

function seedTestAdmins() {
  let admins = [
    {
      email: 'mason@admin.com',
      fName: 'Mason',
      lName: 'Admin'
    },
    {
      email: 'will@admin.com',
      fName: 'Will',
      lName: 'Admin'
    },
    {
      email: 'rui@admin.com',
      fName: 'Rui',
      lName: 'Admin'
    },
    {
      email: 'danny@admin.com',
      fName: 'Danny',
      lName: 'Admin'
    },
    {
      email: 'turiya@admin.com',
      fName: 'Turiya',
      lName: 'Admin'
    },
  ];
  admins.forEach((admin) => {
    return firebase.auth().createUserWithEmailAndPassword(admin.email, 'password')
      .then(({ user }) => {
        const { uid } = user;
        const newUser = {
          uid,
          email: admin.email,
          fName: admin.fName,
          lName: admin.lName,
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
  })

}

function seedTestUsers() {

  let testUsers = [
    {
      email: 'mason@user.com',
      fName: 'Mason',
      lName: 'User'
    },
    {
      email: 'will@user.com',
      fName: 'Will',
      lName: 'User'
    },
    {
      email: 'rui@user.com',
      fName: 'Rui',
      lName: 'User'
    },
    {
      email: 'danny@user.com',
      fName: 'Danny',
      lName: 'User'
    },
    {
      email: 'turiya@user.com',
      fName: 'Turiya',
      lName: 'User'
    },
  ];

  testUsers.forEach((testUser) => {
    return firebase.auth().createUserWithEmailAndPassword(testUser.email, 'password')
      .then(({ user }) => {
        const { uid } = user;

        const newUser = {
          uid,
          email: testUser.email,
          fName: testUser.fName,
          lName: testUser.lName,
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
  })
}

function seedUsers(n) {
  for (let i = 0; i < n; i++) {
    let email = faker.internet.email()
    firebase.auth().createUserWithEmailAndPassword(email, "password")
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
    .then(() => {
      console.log('Site seeded with zone coordinates')
    })
}


function eraseAndReseed(n) { // n = no of users to seed
  eraseDb()
    .then(() => {
      console.log('DB erased');
      return seedTestAdmins();
    })
    .then(() => {
      console.log('Test Admin seeded');
      return seedTestUsers();
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
}



// eraseDb()
// seedSite(safeZone, buildingZone)
// seedTestAdmins();
// seedTestUsers();
// seedUsers(40)

eraseAndReseed()
