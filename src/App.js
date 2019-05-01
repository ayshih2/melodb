import React, { Component } from 'react';
import logo from './logo.svg';
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
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
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
