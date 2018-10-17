const firebase = require('firebase');
const { config } = require('./config/firebase-config');

firebase.initializeApp(config);
const { database } = firebase;

// these two functions will need to change to accept a userID
exports.enterBuilding = (bool) => {
  database()
    .ref('/users/0')
    .update({ inBuilding: bool });
};

// these two functions will need to change to accept a userID
exports.enterSafeZone = (bool) => {
  database()
    .ref('/users/0')
    .update({ inSafeZone: bool });
};

exports.createUser = (fName, lName, email, password) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(({ user }) => {
      const { uid } = user;
      const newUser = {
        uid,
        fName,
        lName,
        inBuilding: false,
        inSafeZone: false,
        isAdmin: false,
      };
      database()
        .ref('/users')
        .push(newUser)
        .then(({ path }) => console.log(path));
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

exports.getAllUsers = () => {
  firebase
    .database()
    .ref('/users')
    .on('value', data => data.val());
};
