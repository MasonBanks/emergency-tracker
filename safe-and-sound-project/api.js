const firebase = require('firebase');
const { config } = require('./config/firebase-config');

const { database } = firebase;
firebase.initializeApp(config);

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
        uid,
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


getUserById = id => database().ref('/users').orderByKey().equalTo(id)
  .once('value')
  .then((data) => {
    if (data) {
      return data;
    }
    alert('Submitted information does not exist within database');
  })
  .catch(err => alert(err));

exports.login = (email, password) => firebase.auth().signInWithEmailAndPassword(email, password)
  .then(({ user }) => {
    const { uid } = user;
    return getUserById(uid);
  })
  .catch(err => alert(err));

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

exports.readEmergencyStatus = () => database().ref('/site').child('isEmergency').on('value', (snapshot) => {
  const mode = snapshot.val();
  console.log(`current status: ${snapshot.val()}`);
  return snapshot.val();
});

exports.toggleEmergencyStatus = (mode) => {
  database().ref('/site').child('isEmergency').once('value')
    .then((data) => {
      console.log(`current emergency status: ${data.val()}`);
      const currentStatus = data.val();
      database().ref('/site').child('isEmergency').set(!currentStatus)
        .then(() => {
          database().ref('/site').child('isEmergency').once('value')
            .then(() => {
              console.log(`Emergency status set to ${data.val()}`);
            });
        });
    });
};
