// var axios = require('axios');

// /**
//  * Performs the axios GET request to the provided URL while letting 
//  * the backend know if the request was coming from a logged in user or not.
//  * 
//  * @param {String} url - API endpoint (http://localhost:5000/api/user/?email=testEmail)
//  * @param {*} firebaseAuth - Firebase Auth object (firebase.auth())
//  */
// var checkedAxiosGet = async(url, firebaseAuth) => {
//     let idToken = firebaseAuth.currentUser ? await firebaseAuth.currentUser.getIdToken(/* forceRefresh */ true) : "";
//     let config = {
//         headers: {'Authorization': "bearer " + idToken}
//     }

//     return axios.get(url, config);
// }

// /**
//  * Checks if the provided request has a bearer token.
//  * 
//  * @param {Request object} req 
//  */
// var hasValidCredentials = (req) => {
//     if (!req.headers.authorization) {
//         return false;
//     }

//     let header = req.headers.authorization.split(" ");
//     return header.length == 2 && header[0] == 'bearer';
// }

// module.exports = {
//     checkedAxiosGet: checkedAxiosGet,
//     hasValidCredentials: hasValidCredentials
// }