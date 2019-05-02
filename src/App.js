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
import Login from './Components/Login/Login.jsx';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {
  state = {};

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
          <Route exact path={process.env.PUBLIC_URL + '/Login'} render = {props =>
            <div>
              <Login />
            </div>
          } />
        </Switch>
      </Router>
    );
  }
}

export default App;
