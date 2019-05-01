import React, { Component } from 'react';
import logo from './logo.svg';
import Search from './Components/Search/Search';
import Header from './Components/Header/Header';
import Compare from './Components/Compare/Compare';
import User from './Components/User/User';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { auth, googleAuthProvider } from './firebase.js';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import axios from 'axios';
import {checkedAxiosGet} from './utils.js';

class App extends Component {
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

  componentDidMount() {

    auth.onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
      if (user) {
        // Add user to database if new user
        axios.post("http://localhost:5000/api/user/", {
          name: user.displayName,
          email: user.email
        }).catch(err => {
          console.log(err);
        });
      }
      this.callApi();
      console.log("user", user)
    })
  }

  callApi = async () => {
    checkedAxiosGet('http://localhost:5000/api/user/?email=testEmail', auth).then(res => {
      this.setState({response: res.data.message});
    }).catch(err => {
      this.setState({response: err.response.data.message})
    });
  }

  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();
    this.setState({ responseToPost: body });
  };

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path={process.env.PUBLIC_URL + '/'} render = {props =>
            <div>
              <Header />
              <Search />
            </div>
          } />
          <Route exact path={process.env.PUBLIC_URL + '/Compare'} render = {props =>
            <div>
              <Header />
              <Compare />
            </div>
          } />
          <Route exact path={process.env.PUBLIC_URL + '/User'} render = {props =>
            <div>
              <Header />
              <User />
            </div>
          } />
        </Switch>
      </Router>
    );
  }
}
// <div className="App">
// <header className="App-header">
// <img src={logo} className="App-logo" alt="logo" />
// <p>
// Edit <code>src/App.js</code> and save to reload.
// </p>
// <a
// className="App-link"
// href="https://reactjs.org"
// target="_blank"
// rel="noopener noreferrer"
// >
// Learn React
// </a>
// </header>
//
// <p>{this.state.response}</p>
// <form onSubmit={this.handleSubmit}>
// <p>
// <strong>Post to Server:</strong>
// </p>
// <input
// type="text"
// value={this.state.post}
// onChange={e => this.setState({ post: e.target.value })}
// />
// <button type="submit">Submit</button>
// </form>
// <p>{this.state.responseToPost}</p>
//
// {this.state.isSignedIn ? (
//   <span>
//   <div>Signed In!</div>
//   <button onClick={() => auth.signOut()}>Sign out!</button>
//   <h1>Welcome {auth.currentUser.displayName}</h1>
//   <img
//   alt="profile picture"
//   src={auth.currentUser.photoURL}
//   />
//   </span>
// ) : (
//   <StyledFirebaseAuth
//   uiConfig={this.uiConfig}
//   firebaseAuth={auth}
//   />
// )}
// </div>

export default App;
