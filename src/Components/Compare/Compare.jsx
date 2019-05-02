import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CompareDisplay from './CompareDisplay'
import { Grid, Segment } from 'semantic-ui-react';
import { VictoryPie, VictoryLabel, VictoryBar, VictoryChart, VictoryAxis } from 'victory';
import axios from 'axios';
import Listview from '../Search/Listview/Listview.jsx';
import '../Search/Listview/Listview.scss';


class Compare extends Component {
  constructor(props) {
    super(props);
		this.state = {
            pieData: [
					    { x: "I", y: 0, label: "click me" },
					    { x: "You", y: 0, label: "click me" },
					    { x: "Me", y:  0, label: "click me"},
					    { x: "Word", y: 0, label: "click me" },
					    { x: "Dunno", y: 100, label: "click me" }
            ],
            barData: [{x: 'Waste It On Me', y: 5}, {x: 'Free Spirit', y: 5}],
            valueLeft: '',
            valueRight: '',
      		resultLeft: {},
      		resultRight: {}
    }

    this.leftSearchRef = React.createRef();
    this.rightSearchRef = React.createRef();
    this.bars = React.createRef();
    this._onBlur = this._onBlur.bind(this);
    this._onLeftFocus = this._onLeftFocus.bind(this);
    this._onRightFocus = this._onRightFocus.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.inputChangeHandlerLeft = this.inputChangeHandlerLeft.bind(this);
    this.clickHandlerLeft = this.clickHandlerLeft.bind(this);
    this.inputChangeHandlerRight = this.inputChangeHandlerRight.bind(this);
    this.clickHandlerRight = this.clickHandlerRight.bind(this);
  }

  clickHandlerLeft() {
    if (this.state.valueLeft) {
      const config = {
        baseURL: 'https://melodb-uiuc.herokuapp.com/api',
        url: `song?name=${this.state.valueLeft}`
      }
      axios(config).then((response) => {
        this.setState({
          resultLeft: response.data.data
        });
      }).catch((error) => {
        this.setState({
          resultLeft: ''
        });
      });
    } else {
      this.setState({
        resultLeft: ''
      });
    }
  }

	inputChangeHandlerLeft(e) {
	    this.setState({
	      valueLeft: e.target.value
	    }, this.clickHandlerLeft);
  	}

  	clickHandlerRight() {
	    if (this.state.valueRight) {
	      const config = {
	        baseURL: 'https://melodb-uiuc.herokuapp.com/api',
	        url: `song?name=${this.state.valueRight}`
	      }
	      axios(config).then((response) => {
	        this.setState({
	          resultRight: response.data.data
	        });
	      }).catch((error) => {
	        this.setState({
	          resultRight: ''
	        });
	      });
	    } else {
	      this.setState({
	        resultRight: ''
	      });
	    }
  }

	inputChangeHandlerRight(e) {
	    this.setState({
	      valueRight: e.target.value
	    }, this.clickHandlerRight);
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

	componentDidMount() {
	  this.setState({
	      pieData: [
			    { x: "I", y: 15},
			    { x: "You", y: 15},
			    { x: "Me", y:  40},
			    { x: "running", y: 10},
			    { x: "Dunno", y:  20}
	  ]})
  }

	/* icon to search bar animation from https://codepen.io/sebastianpopp/pen/myYmmy with tweaks to make it for react */
  render() {
    return (
    	<div className='gridLayout'>
				<Grid textAlign='center' columns='equal'>
			    <Grid.Row>
			      <Grid.Column>
				      <Segment>
					      <label className="search" htmlFor="left_inpt_search" onFocus={this._onLeftFocus} onBlur={this._onBlur}>
									<input ref={this.leftSearchRef} id="left_inpt_search" type="text" onChange={this.inputChangeHandlerLeft} value={this.state.valueLeft}/>
								</label>
							</Segment>
						<Listview query={this.state.resultLeft} />
			      </Grid.Column>
			      <Grid.Column>
				      <Segment>
								<label className="search" htmlFor="right_inpt_search" onFocus={this._onRightFocus} onBlur={this._onBlur}>
									<input ref={this.rightSearchRef} id="right_inpt_search" type="text" onChange={this.inputChangeHandlerRight} value={this.state.valueRight}/>
								</label>
							</Segment>

						<Listview query={this.state.resultRight} />
			      </Grid.Column>
			    </Grid.Row>   
			  </Grid>
			</div>
    );
  }
}


export default Compare;
