const firebase = require("firebase");
const { database } = firebase;

exports.assignPushToken = (req, res) => {
  console.log(req.body);
  const { uid } = req.body;
  const { token } = req.params;
  database()
    .ref("users")
    .child(uid)
    .child("token")
    .set(token);
};
