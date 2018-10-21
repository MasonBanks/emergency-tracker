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
