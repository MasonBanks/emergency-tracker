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
          this.getUserById(uid);
        })
        .catch(console.log);
    })
    .catch((error) => {
      if (error.code === 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        console.log(error.message);
      }
      console.log(error);
    });
};

getUserById = (id) => {
  return database().ref('/users').orderByKey().equalTo(id)
    .once('value')
    .then(data => {
      if (data) {
        return data
      } else {
        alert(`${data.fname} doesn't exist within database`)
      }
    })
    .catch(err => alert(err));
};

exports.login = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(({ user }) => {
      const { uid } = user;
      return getUserById(uid);
    })
    .catch(err => alert(err));
};

exports.toggleAdminStatus = (uid) => {
  database().ref(`/users/${uid}/isAdmin`).once('value')
    .then((data) => {
      const currentStatus = data.val();
      database().ref(`/users/${uid}`).update({ isAdmin: !currentStatus });
    });
};

exports.toggleFirstAiderStatus = (uid) => {
  database().ref(`/users/${uid}/isFirstAider`).once('value')
    .then((data) => {
      const currentStatus = data.val();
      database().ref(`/users/${uid}`).update({ isFirstAider: !currentStatus });
    });
};
