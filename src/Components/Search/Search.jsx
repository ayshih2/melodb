import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';
import './Search.css';
import Display from './Display/Display'

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      first: true
    };
    this.out = React.createRef();
    this.searchRef = React.createRef();
    this.inputChangehandler = this.inputChangehandler.bind(this);
    this.changeHeight = this.changeHeight.bind(this);
  }

  changeHeight(elem) {
    if (this.state.first) {
      elem.style.transform = '';
      elem.style.transition = '';
      this.out.current.style.height = '100%';
    }
    this.setState({
      first: false
    });
  }

  inputChangehandler(e) {
    if (this.state.first) {
      var elem = this.searchRef.current;
      elem.style.transform = 'translateY(-40vh)';
      elem.style.transition = "all 1000ms";
    }
    this.setState({
      value: e.target.value
    })
    setTimeout(this.changeHeight, 800, elem);
  }

  render() {
    return (
      <div>
        <div className='searchBar' ref={this.out}>
          <div ref={this.searchRef} ><Input onChange={this.inputChangehandler} value={this.state.value} /></div>
        </div>
        <Display query={this.state.value} />
      </div>
    );
  }
}

export default SearchBar;
