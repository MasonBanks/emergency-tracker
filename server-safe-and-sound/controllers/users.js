const firebase = require('firebase');
const { database } = firebase;

exports.assignPushToken = (uid) => {
  console.log(req.body);
  const { pushToken } = req.params;
  database().ref('users').child(uid).push({ pushToken })
}