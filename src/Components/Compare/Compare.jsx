import React, { Component } from 'react';
import './Compare.scss';

class Compare extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };

    this.leftSearchRef = React.createRef();
    this.rightSearchRef = React.createRef();
    this._onBlur = this._onBlur.bind(this);
    this._onLeftFocus = this._onLeftFocus.bind(this);
    this._onRightFocus = this._onRightFocus.bind(this);
  }

	_onBlur() {
		var leftSearchElem = this.leftSearchRef.current;
		if (leftSearchElem.value.length === 0) {
			leftSearchElem.parentElement.classList.remove('active');
		}

		var rightSearchElem = this.rightSearchRef.current;
		if (rightSearchElem.value.length === 0) {
			rightSearchElem.parentElement.classList.remove('active');
		}
	}

	_onLeftFocus() {
    var leftSearchElem = this.leftSearchRef.current;
    leftSearchElem.parentElement.classList.add('active');
	}

	_onRightFocus() {
		var rightSearchElem = this.rightSearchRef.current;
    rightSearchElem.parentElement.classList.add('active');
	}

	/* icon to search bar animation from https://codepen.io/sebastianpopp/pen/myYmmy with tweaks to make it for react */
  render() {
    return (
			<div className="cntr">
				<span id="leftSearch">
	  			<label className="search" htmlFor="left_inpt_search" onFocus={this._onLeftFocus} onBlur={this._onBlur}>
						<input ref={this.leftSearchRef} id="left_inpt_search" type="text" />
					</label>
				</span>

				<span id="rightSearch">
					<label className="search" htmlFor="right_inpt_search" onFocus={this._onRightFocus} onBlur={this._onBlur}>
						<input ref={this.rightSearchRef} id="right_inpt_search" type="text" />
					</label>
				</span>
			</div>
    );
  }
}

export default Compare;