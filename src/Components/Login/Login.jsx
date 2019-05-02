import React, { Component } from 'react';
import { auth, googleAuthProvider } from '../../firebase.js';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import axios from 'axios';
import './Login.scss';

class Login extends Component {
	state = {
			isSignedIn: false,
			redirectUrl: process.env.PUBLIC_URL + '/'
  };

	uiConfig = {
			signInFlow: "popup",
			signInSuccessUrl: process.env.PUBLIC_URL + '/',
	    signInOptions: [
	      googleAuthProvider.PROVIDER_ID
	    ]
	}

	componentDidMount() {
    auth.onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
      if (user) {
        // Add user to database if new user
        axios.post("https://melodb-uiuc.herokuapp.com/api/user/", {
          name: user.displayName,
          email: user.email
        }).catch(err => {
          console.log(err);
        });
			}
		});
	}

	render() {
		return (
			<div className="center-login">
				<div className="middle-center">
				MeloDB: Top 100 Songs
				<StyledFirebaseAuth
					uiConfig = { this.uiConfig }
					firebaseAuth = { auth }
				/>
				</div>
			</div>

		)
	}
}

export default Login;