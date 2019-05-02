import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';
import './Search.scss';
import axios from 'axios';
import List from './List/List';
import Display from './Display/Display';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      result: {}
    }

    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    const config = {
      baseURL: 'http://localhost:5000/api',
      url: `song?name=${this.state.value}`
    }
    axios(config).then((response) => {
      this.setState({
        result: response.data
      });
    }).catch((error) => {
      this.setState({
        result: ''
      });
    });
  }

  inputChangeHandler(e) {
    this.setState({
      value: e.target.value
    }, this.clickHandler);
  }

  render() {
    return (
      <div>
        <div className='parent'>
          <div className='container'>
            <Input className='containerinput' size='massive' transparent placeholder='I AM LOOKING FOR...' onChange={this.inputChangeHandler} value={this.state.value} />
          </div>
          <List query={this.state.result} />
        </div>      
        <div>
          <Display />
        </div>
      </div>
    );
  }
}


export default Search;
