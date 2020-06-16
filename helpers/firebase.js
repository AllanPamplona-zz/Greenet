var admin = require('firebase-admin');

module.exports = {
  connect(){
    admin.initializeApp({
      credential: cred = admin.credential.cert(require('../iot.json')),
      databaseURL: 'https://iot-greenet.firebaseio.com'
    });
  },
  sendMessage(message, userId){
    admin.database().ref('user/' + userId).set(message);
  }
}