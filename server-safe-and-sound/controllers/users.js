const firebase = require('firebase');
const { database } = firebase;

exports.assignPushToken = (uid) => {
  console.log(req.body);
  const { token } = req.params;
  database().ref('users').child(uid).push({ token })
}