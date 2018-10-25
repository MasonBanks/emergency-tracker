const firebase = require('firebase');
const { config } = require('./config/firebase-config');

const { database } = firebase;
firebase.initializeApp(config);

// these two functions will need to change to accept a userID
exports.enterBuilding = bool => database()
  .ref('/users/0')
  .update({ inBuilding: bool });

// these two functions will need to change to accept a userID
exports.enterSafeZone = bool => database()
  .ref('/users/0')
  .update({ inSafeZone: bool });

exports.createUser = (fname, lName, email, password) => firebase
  .auth()
  .createUserWithEmailAndPassword(email, password)
  .then(({ user }) => {
    const { uid } = user;
    const newUser = {
      uid,
      fname,
      lName,
      email,
      inBuilding: false,
      inSafeZone: false,
      markedSafe: null,
      markedInDanger: null,
      avatar: 'https://commons.wikimedia.org/wiki/File:Profile_avatar_placeholder_large.png',
      isAdmin: false,
      isFirstAider: false,
    };
    return database()
      .ref(`/users/${uid}`)
      .set(newUser)
      .then(() => database()
        .ref('/users')
        .orderByKey()
        .equalTo(uid)
        .once('value')
        .then((data) => {
          console.log(data.val(), '<<< User added to realtime db');
          return data;
        })
        .catch(err => alert(err)))
      .catch((error) => {
        console.log(error);
        if (error.code === 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          console.log(error.message);
        }
      });
  });

exports.getUserById = uid => database()
  .ref('/users')
  .orderByKey()
  .equalTo(uid)
  .once('value')
  .then((data) => {
    if (data) {
      console.log(data.val());
      return data;
    }
    alert('Submitted information does not exist within database');
  })
  .catch(err => alert(err));

exports.login = (email, password) => firebase
  .auth()
  .signInWithEmailAndPassword(email, password)
  .then(({ user }) => {
    const { uid } = user;
    return database()
      .ref('/users')
      .orderByKey()
      .equalTo(uid)
      .once('value')
      .then((data) => {
        if (data) {
          return data;
        }
      })
      .catch(err => alert(err));
  });

exports.toggleAdminStatus = uid => database()
  .ref(`/users/${uid}/isAdmin`)
  .once('value')
  .then((data) => {
    const currentStatus = data.val();
    return database()
      .ref(`/users/${uid}`)
      .update({ isAdmin: !currentStatus });
  });

exports.toggleFirstAiderStatus = uid => database()
  .ref(`/users/${uid}/isFirstAider`)
  .once('value')
  .then((data) => {
    const currentStatus = data.val();
    return database()
      .ref(`/users/${uid}`)
      .update({ isFirstAider: !currentStatus });
  });

exports.emergencyStatusListener = () => database()
  .ref('/site')
  .child('isEmergency')
  .on('value', (snapshot) => {
    console.log(`current status: ${snapshot.val()}`);
  });

exports.toggleEmergencyStatus = () => database()
  .ref('/site')
  .child('isEmergency')
  .once('value')
  .then((data) => {
    console.log(`current emergency status: ${data.val()}`);
    const currentStatus = data.val();
    return database()
      .ref('/site')
      .update({ isEmergency: !currentStatus })
      .then(() => database()
        .ref('/site')
        .child('isEmergency')
        .once('value')
        .then((newData) => {
          console.log(`Emergency status set to ${newData.val()}`);
        }));
  });

exports.createNewEvacuation = (adminId, startTime) => database().ref('users').orderByChild('inBuilding').equalTo(true)
  .once('value', (snapshot) => {
    const inBuildingUsers = snapshot.val();
    return database().ref(`evacuations/${startTime}`).set({
      adminId,
      startTime,
      finishTime: null,
      inBuildingUsers,
    });
  });

exports.getEvacList = adminId => database().ref('evacuations').orderByChild('adminId').equalTo(adminId)
  .once('value')
  .then((data) => {
    mostRecentStamp = Object.keys(data.val()).sort((a, b) => b - a)[0];
    return database().ref(`evacuations/${mostRecentStamp}/inBuildingUsers`).once('value')
      .then((users) => {
        const evacList = Object.values(users.val());
        return evacList;
      });
  });


exports.endCurrentEvacuation = adminId => database().ref('evacuations').orderByChild('adminId').equalTo(adminId)
  .once('value')
  .then((data) => {
    mostRecentStamp = Object.keys(data.val()).sort((a, b) => b - a)[0];
    return database().ref(`evacuations/${mostRecentStamp}`).update({
      finishTime: Date.now(),
    });
  });

exports.getSafeZone = () => database()
  .ref('/site/safeZone')
  .once('value')
  .then(data => data);

exports.getBuilding = () => database()
  .ref('/site/building')
  .once('value')
  .then(data => data);

exports.saveSafeZone = (Zone, zoneName) => database()
  .ref('/site')
  .update({
    [zoneName]: Zone,
  });

exports.userInBuilding = uid => database()
  .ref(`/users/${uid}`)
  .update({ inBuilding: true });

exports.userExitBuilding = uid => database()
  .ref(`/users/${uid}`)
  .update({ inBuilding: false });

exports.userInSafeZone = uid => database()
  .ref(`/users/${uid}`)
  .update({ inSafeZone: true });

exports.userExitSafeZone = uid => database()
  .ref(`/users/${uid}`)
  .update({ inSafeZone: false });

exports.getAllUsers = () => database()
  .ref('/users')
  .once('value')
  .then(userData => userData.val());

exports.updateUser = (uid, entriesToUpdateObj) => database()
  .ref(`/users/${uid}`)
  .update(entriesToUpdateObj)
  .then(updatedData => updatedData.val());

// exports.userInBuilding = (uid) => {
//   console.log(uid);
//   database().ref(`/inBuildingUsers/${uid}`).set(null);
// };

exports.getSafeList = adminId => this.getEvacList(adminId)
  .then(list => list);

exports.addMeToEvacSafeList = userId => database().ref('evacuations').orderByChild('adminId').equalTo(adminId)
  .once('value')
  .then((data) => {
    mostRecentStamp = Object.keys(data.val()).sort((a, b) => b - a)[0];
    return database().ref(`evacuations/${mostRecentStamp}/markedSafe`).push(Date.now())
  })
