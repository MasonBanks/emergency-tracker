const firebase = require('firebase');
const { database } = firebase;

exports.assignPushToken = (req, res, next) => {
  console.log(req.body);
  const { uid, token } = req.params;
  database().ref('users').child(uid).push({ token })
}

exports.pushTestNode = (req, res, next) => {
  database().ref('users').push({ test: 'hello world' })
    .then(() => {
      console.log('pushTestNode to db returning!')
    })
    .catch(console.log)
}

exports.getAllUsers = (req, res, next) => {
  database().ref('users').once('value', (snapshot) => {
    console.log('getAllUsers query response payload', snapshot.val())
    return snapshot
  })
    .then((data) => {
      return console.log('then block of getAllUsers', data.val())
    })
}