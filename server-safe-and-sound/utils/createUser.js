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
      isAdmin: false,
      isFirstAider: false,
    };
    return database()
      .ref(`/users/${uid}`)
      .set(newUser)
      .then(() => database().ref('/users').orderByKey().equalTo(uid)
        .once('value')
        .then((data) => {
          console.log(data.val(), '<<< User added to realtime db');
          return data;
        })
        .catch(err => console.log(err)))
      .catch((error) => {
        console.log(error.message);
      });
  });