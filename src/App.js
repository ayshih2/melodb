import React, { Component } from 'react';
import logo from './logo.svg';
import { auth, googleAuthProvider } from './firebase.js';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import axios from 'axios';
import Search from './Components/Search/Search';
import Header from './Components/Header/Header';
import Compare from './Components/Compare/Compare';
import CompareDisplay from './Components/Compare/CompareDisplay';
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
              <Header initialActiveItem={'search'}/>
              <Search />
            </div>
          } />
          <Route exact path={process.env.PUBLIC_URL + '/Compare'} render = {props =>
            <div>
              <Header initialActiveItem={'compare'}/>
              <Compare />
            </div>
          } />
          <Route exact path={process.env.PUBLIC_URL + '/User'} render = {props =>
            <div>
              <Header initialActiveItem={'user'}/>
              <User />
            </div>
          } />
          <Route exact path={process.env.PUBLIC_URL + '/Login'} render = {props =>
            <div>
              <Login redirectUrl={'/'}/>
            </div>
          } />
          <Route exact path={process.env.PUBLIC_URL + '/Display'} render = {props =>
            <div>
              <Header initialActiveItem={'search'}/>
              <User />
            </div>
          } />  
          <Route exact path={process.env.PUBLIC_URL + '/CompareDisplay'} render = {props =>
            <div>
              <Header initialActiveItem={'compare'}/>
              <User />
            </div>
          } />          
        </Switch>
      </Router>
    );
  }
}

export default App;
