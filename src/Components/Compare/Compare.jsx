import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CompareDisplay from './CompareDisplay'
import { Grid, Segment } from 'semantic-ui-react';
import { VictoryPie, VictoryLabel, VictoryBar, VictoryChart, VictoryAxis } from 'victory';
import axios from 'axios';
import Listview from '../Search/Listview/Listview';
import '../../variables.scss';

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
            value: '',
      			result: {}
    }

    this.leftSearchRef = React.createRef();
    this.rightSearchRef = React.createRef();
    this.bars = React.createRef();
    this._onBlur = this._onBlur.bind(this);
    this._onLeftFocus = this._onLeftFocus.bind(this);
    this._onRightFocus = this._onRightFocus.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    if (this.state.value) {
      const config = {
        baseURL: 'http://localhost:5000/api',
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
									<input ref={this.leftSearchRef} id="left_inpt_search" type="text" onChange={this.inputChangeHandler} value={this.state.value}/>
								</label>
							</Segment>
			      </Grid.Column>
			      <Grid.Column>
				      <Segment>
								<label className="search" htmlFor="right_inpt_search" onFocus={this._onRightFocus} onBlur={this._onBlur}>
									<input ref={this.rightSearchRef} id="right_inpt_search" type="text" />
								</label>
							</Segment>
			      </Grid.Column>
			    </Grid.Row>   
			  </Grid>
			  
			  <Listview query={this.state.result} />
			</div>
    );
  }
}


export default Compare;
