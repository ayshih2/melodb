import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';
import './Search.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };

    this.searchRef = React.createRef();
    this.inputChangehandler = this.inputChangehandler.bind(this);
  }

  inputChangehandler(e) {
    var elem = this.searchRef.current;
    elem.style.transform = 'translateY(-46vh)';
    elem.style.transition = "all 1000ms";
  }

  render() {
    return (
      <div ref={this.searchRef} className='searchBar'>
        <Input onChange={this.inputChangehandler} />
      </div>
    );
  }
}

export default SearchBar;
