import React, { Component } from 'react';
import logo from './logo.svg';
import { auth, googleAuthProvider } from './firebase.js';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import axios from 'axios';
import {checkedAxiosGet} from './utils.js';
import Search from './Components/Search/Search';
import Header from './Components/Header/Header';
import Compare from './Components/Compare/Compare';
import User from './Components/User/User';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

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

    // auth.onAuthStateChanged(user => {
    //   this.setState({ isSignedIn: !!user })
    //   if (user) {
    //     // Add user to database if new user
    //     axios.post("http://localhost:5000/api/user/", {
    //       name: user.displayName,
    //       email: user.email
    //     }).catch(err => {
    //       console.log(err);
    //     });
    //   }
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
    // })
  }

  callApi = async () => {
  //   checkedAxiosGet('http://localhost:5000/api/user/?email=testEmail', auth).then(res => {
  //     this.setState({response: res.data.message});
  //   }).catch(err => {
  //     this.setState({response: err.response.data.message})
  //   });
  // };
    const response = await fetch('/api/hello');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

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

export default App;
