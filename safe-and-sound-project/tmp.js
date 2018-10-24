const firebase = require('firebase');
const api = require('./api');
const { config } = require('./config/firebase-config');
const { database } = firebase;
// firebase.initializeApp(config);

// api.toggleEmergencyStatus();

createUser = (fname, lName, email, password) => firebase
  .auth()
  .createUserWithEmailAndPassword(email, password)
  .then((data) => {
    console.log(data);
    return data;
    // const { uid } = user;
    // const newUser = {
    //   uid,
    //   fname,
    //   lName,
    //   inBuilding: false,
    //   inSafeZone: false,
    //   isAdmin: false,
    //   isFirstAider: false,
    // };
    // return database()
    //   .ref(`/users/${uid}`)
    //   .set(newUser)
    //   .then((response) => {
    //     console.log(response, '<<<<<<<<<<<<<,')
    //   })
    //   .catch(console.log);
  });
// .catch((error) => {
//   if (error.code === 'auth/weak-password') {
//     alert('The password is too weak.');
//   } else {
//     console.log(error.message);
//   }
//   console.log(error);
// });


createUser('test', 'person', 'iamaperson6@gmail.com', 'password');

// api.getUserById('pI1EYTutWqZNSMTBFjTwF7hAdfC2')

// api.login('user@gmail.com', 'password');
