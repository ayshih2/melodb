import firebase from 'firebase'

const config = {
    apiKey: 'AIzaSyDF6p-r7atK_m-tA9ZEmrhLVB3eAHedqMo',
    authDomain: 'melodb-1556480520882.firebaseapp.com'
};
firebase.initializeApp(config);

export const googleAuthProvider = firebase.auth.GoogleAuthProvider;
export const auth = firebase.auth();
export default firebase;
