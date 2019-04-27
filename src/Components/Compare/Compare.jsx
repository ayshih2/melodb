import React, { Component } from 'react';
import './Compare.scss';

class Compare extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };

    this.searchRef = React.createRef();
    this._onBlur = this._onBlur.bind(this);
    this._onFocus = this._onFocus.bind(this);
  }

	_onBlur() {
		var elem = this.searchRef.current;
		if (elem.value.length == 0) {
			elem.parentElement.classList.remove('active');
		}
	}

	_onFocus() {
    var elem = this.searchRef.current;
    elem.parentElement.classList.add('active');
	}

	/* icon to search bar animation from https://codepen.io/sebastianpopp/pen/myYmmy with tweaks to make it for react */
  render() {
    return (
			<div className="cntr">
				<div className="cntr-innr">
	  			<label className="search" htmlFor="inpt_search" onFocus={this._onFocus} onBlur={this._onBlur}>
						<input ref={this.searchRef} id="inpt_search" type="text" />
					</label>
				</div>
			</div>
    );
  }
}

export default Compare;