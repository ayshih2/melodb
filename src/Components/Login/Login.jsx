import React, { Component } from 'react';
import { auth, googleAuthProvider } from '../../firebase.js';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import axios from 'axios';
import './Login.scss';
import { Redirect } from 'react-router-dom'
import { Message } from 'semantic-ui-react'

class Login extends Component {
	state = {
			isSignedIn: false,
			willRedirect: false
  };

	handleSuccessfulSignIn = () => {
		// registering new users to the database is handled in onAuthStateChanged
		// notify Login component to redirect to redirectUrl
		this.setState({willRedirect: true});
	}

	uiConfig = {
			signInFlow: "popup",
	    signInOptions: [
	      googleAuthProvider.PROVIDER_ID
			],
			callbacks: {
				signInSuccessWithAuthResult: this.handleSuccessfulSignIn
			}
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
		if (this.state.willRedirect === true) {
			return <Redirect to={this.props.redirectUrl} />
		}

		return (
			<div className="center-login">
				<div className="middle-center">
				MeloDB: Top 100 Songs
				<StyledFirebaseAuth
					uiConfig = { this.uiConfig }
					firebaseAuth = { auth }
				/>
				<Message warning color='purple' size='mini'>
					<Message.Header>You must log in before accessing our website!</Message.Header>
					<p>Please log in to continue.</p>
				</Message>
				</div>
			</div>

		)
	}
}

Login.defaultProps = {
  redirectUrl: '/'
};

export default Login;