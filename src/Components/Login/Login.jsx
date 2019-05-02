import React, { Component } from 'react';
import { auth, googleAuthProvider } from '../../firebase.js';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import axios from 'axios';
import './Login.scss';
import {checkedAxiosGet} from '../../utils.js';


class Login extends Component {
	state = {
	    response: '',
	    post: '',
	    responseToPost: '',
	    isSignedIn: false
  	};

	uiConfig = {
	    signInFlow: "popup",
	    signInOptions: [
	      googleAuthProvider.PROVIDER_ID
	    ],
	    callbacks: {
	      signInSuccess: () => false
	    }
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