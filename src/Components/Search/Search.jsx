import React, { Component } from 'react';
import { Input, Loader} from 'semantic-ui-react';
import './Search.scss';
import axios from 'axios';
import Listview from './Listview/Listview';
import firebase from 'firebase';
import Login from '../Login/Login.jsx';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      result: {},
      isLoading: true
    }

    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    if (this.state.value) {
      const config = {
        baseURL: 'https://melodb-uiuc.herokuapp.com/api',
        url: `song?name=${this.state.value}`
      }
      axios(config).then((response) => {
        this.setState({
          result: response.data.data
        });
      }).catch((error) => {
        this.setState({
          result: ''
        });
      });
    } else {
      this.setState({
        result: ''
      });
    }
  }

  inputChangeHandler(e) {
    this.setState({
      value: e.target.value
    }, this.clickHandler);
  }

  componentWillMount() {
		firebase.auth().onAuthStateChanged(user => {
			// After getting the user information, if available
      this.setState({isLoading: false});
    });
	}

  render() {
    if(this.state.isLoading) {
      return (
        <div>
					<Loader active inlined='centered'/>
        </div>
      )
    }

    if (!firebase.auth().currentUser) {
      return <Login redirectUrl='/'/>
    }

    return (
      <div className='parent'>
        <div className='search-container'>
          <Input className='input' size='massive' transparent placeholder='SEARCH FOR A SONG...' onChange={this.inputChangeHandler} value={this.state.value} />
        </div>
        <Listview query={this.state.result} />
      </div>
    );
  }
}

export default Search;
