import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';
import './Search.css';
import Display from './Display/Display'

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };

    this.searchRef = React.createRef();
    this.inputChangehandler = this.inputChangehandler.bind(this);
  }

  inputChangehandler(e) {
    var elem = this.searchRef.current;
    elem.style.transform = 'translateY(-46vh)';
    elem.style.maxHeight = "100px";
    elem.style.transition = "all 1000ms";
    this.setState({
      value: e.target.value
    });
  }

  render() {
    return (
      <div>
        <div ref={this.searchRef} className='searchBar'>
          <Input onChange={this.inputChangehandler} value={this.state.value} />
        </div>
        <Display query={this.state.value} />
      </div>
    );
  }
}

export default SearchBar;
