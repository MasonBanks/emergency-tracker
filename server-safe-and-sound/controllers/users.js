const firebase = require('firebase');
const { database } = firebase;

exports.assignPushToken = (req, res, next) => {
  console.log(req.body);
  const { uid, token } = req.params;
  database().ref('users').child(uid).push({ token })
}

exports.getAllUsers = (req, res, next) => {
  database().ref('users').once('value', (snapshot) => {
    console.log('getAllUsers query response payload', snapshot.val())
    return snapshot
  })
}