import React, { Component } from 'react';
import './Compare.scss';

class Compare extends Component {
  render() {
    return (
      <div class="container">
        <input type="text" placeholder="Search..."></input>
        <div class="search"></div>
      </div>
    );
  }
}

export default Compare;
