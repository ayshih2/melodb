import firebase from 'firebase'
var secrets = require('./secrets.js');

const config = {
    apiKey: secrets.firebaseApiKey,
    authDomain: secrets.authDomain
};
firebase.initializeApp(config);

export const googleAuthProvider = firebase.auth.GoogleAuthProvider;
export const auth = firebase.auth();
export default firebase;
