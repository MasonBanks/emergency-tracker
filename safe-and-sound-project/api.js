const firebase = require('firebase');
const { config } = require('./config/firebase-config');

firebase.initializeApp(config);
const { database } = firebase;

// these two functions will need to change to accept a userID
exports.enterBuilding = (bool) => {
  database().ref('/users/0').update({ inBuilding: bool });
};

// these two functions will need to change to accept a userID
exports.enterSafeZone = (bool) => {
  database().ref('/users/0').update({ inSafeZone: bool });
};

exports.createUser = (firstName, lastName, email, password) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(({ user }) => {
    const { uid } = user;
    
    const newUser = {
      firstName,
      lastName,
      email,
      inBuilding: false,
      inSafeZone: false,
      isAdmin: false,
      isFirstAider: false,
    };

    database().ref(`/users/${uid}`).set(newUser)
    .then(() => {
      this.getUserById(uid)
    })
    .catch(console.log)
  })
  .catch((error) => {
    if (error.code === 'auth/weak-password') {
      console.log('The password is too weak.');
    } else {
      console.log(error.message);
    }
    console.log(error);
  });
};

exports.login = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(({ user }) => {
      const { uid } = user;
      this.getUserById(uid);
    })
    .catch(console.log);
};

exports.getUserById = (id) => {
  database().ref('/users').orderByKey().equalTo(id).once('value')
  .then((data) => {
    console.log(data.val() ? data.val() : `${id} doesn't exist in db`);
  })
  .catch(console.log);
};
