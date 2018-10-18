const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

exports.config = {
  projectId: 'safe-and-sound-app-fbe3e',
  databaseURL: 'https://safe-and-sound-app-fbe3e.firebaseio.com/',
  storageBucket: 'gs://safe-and-sound-app-fbe3e.appspot.com',
  apiKey: 'AIzaSyBYE8Z-jNX8NArzBD1mPQHZorfQstPSuRg',
}

exports.adminConfig = {
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://safe-and-sound-app-fbe3e.firebaseio.com"
}