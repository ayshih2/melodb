import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CompareDisplay from './CompareDisplay'
import { Grid, Segment, Image, Header, Label, Icon } from 'semantic-ui-react';
import { VictoryPie, VictoryLabel, VictoryBar, VictoryChart, VictoryAxis } from 'victory';
import axios from 'axios';
import CompareListview from './CompareListview.jsx';
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
      		resultRight: {},
      		boolLeft: false,
  				boolRight: false,
  				leftSongData: {},
  				rightSongData: {},

    }

    this.leftSearchRef = React.createRef();
    this.rightSearchRef = React.createRef();
    this.bars = React.createRef();
    this._onBlur = this._onBlur.bind(this);
    this._onLeftFocus = this._onLeftFocus.bind(this);
    this._onRightFocus = this._onRightFocus.bind(this);
    this.inputChangeHandlerLeft = this.inputChangeHandlerLeft.bind(this);
    this.clickHandlerLeft = this.clickHandlerLeft.bind(this);
    this.inputChangeHandlerRight = this.inputChangeHandlerRight.bind(this);
    this.clickHandlerRight = this.clickHandlerRight.bind(this);
    this.pressedLeftClose = this.pressedLeftClose.bind(this);
    this.pressedRightClose = this.pressedRightClose.bind(this);
  }

  pressedLeftClose() {
    this.setState({boolLeft: false, valueLeft: "", resultLeft: {}})
  }

  pressedRightClose() {
    this.setState({boolRight: false, valueRight: "", resultRight: {}})
  }

  clickedLeftSong(event) {
    this.setState({boolLeft: true, leftSongData: event})
	}

	clickedRightSong(event) {
    this.setState({boolRight: true, rightSongData: event})
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
		if (!(this.state.boolLeft)) {
			var leftSearchElem = this.leftSearchRef.current;
			if (leftSearchElem.value.length === 0) {
				leftSearchElem.parentElement.classList.remove('active');
			}
		}
		if (!this.state.boolRight) {
			var rightSearchElem = this.rightSearchRef.current;
			if (rightSearchElem.value.length === 0) {
				rightSearchElem.parentElement.classList.remove('active');
			}
		}
	}

	_onLeftFocus() {
		if (!this.state.boolLeft) {
    	var leftSearchElem = this.leftSearchRef.current;
    	leftSearchElem.parentElement.classList.add('active');
		}
	}

	_onRightFocus() {
		if (!this.state.boolRight) {
			var rightSearchElem = this.rightSearchRef.current;
    	rightSearchElem.parentElement.classList.add('active');
		}
	}

	/* icon to search bar animation from https://codepen.io/sebastianpopp/pen/myYmmy with tweaks to make it for react */
  render() {
  	var toRender = this.state.boolLeft === true && this.state.boolRight === true
    return (
    	<div className='gridLayout'>
				<Grid textAlign='center' columns='equal'>
			    <Grid.Row>
			      <Grid.Column>
				      <Segment>
				      	{
				      		(this.state.boolLeft == true) ? 
				      		(
						      	<div className='compareContainer'>
		                  <div className='image'>
		                    <Image size='tiny' src={this.state.leftSongData.albumImgUrl} avatar />
		                  </div>
		                  <div className='compareHeader'>
		                    <div>
		                      <Header
		                        as='h2'
		                        content={this.state.leftSongData.songTitle}
		                        subheader={this.state.leftSongData.artist}
		                      />
		                    </div>
		                  </div>
		                  <Label floating onClick={this.pressedLeftClose}>
        								<Icon name='delete' />
     	 								</Label>			                  
		                </div>	
				      		) : (
							      <label className="search" htmlFor="left_inpt_search" onFocus={this._onLeftFocus} onBlur={this._onBlur}>
											<input ref={this.leftSearchRef} id="left_inpt_search" type="text" onChange={this.inputChangeHandlerLeft} value={this.state.valueLeft}/>
										</label>
				      		)
				      	}
							</Segment>
							<CompareListview sendSong={this.getLeftSong} query={this.state.resultLeft} toDisplay={!this.state.boolLeft} buttonClick={this.clickedLeftSong.bind(this)} />
			      </Grid.Column>
			      <Grid.Column>
				      <Segment>
				      	{
				      		(this.state.boolRight == true) ? 
				      		(
						      	<div className='compareContainer'>
		                  <div className='image'>
		                    <Image size='tiny' src={this.state.rightSongData.albumImgUrl} avatar />
		                  </div>
		                  <div className='compareHheader'>
		                    <div>
		                      <Header
		                        as='h2'
		                        content={this.state.rightSongData.songTitle}
		                        subheader={this.state.rightSongData.artist}
		                      />
		                    </div>
		                  </div>
		                  <Label floating onClick={this.pressedRightClose}>
        								<Icon name='delete' />
     	 								</Label>			                  
		                </div>
				      		) : (
										<label className="search" htmlFor="right_inpt_search" onFocus={this._onRightFocus} onBlur={this._onBlur}>
											<input ref={this.rightSearchRef} id="right_inpt_search" type="text" onChange={this.inputChangeHandlerRight} value={this.state.valueRight}/>
										</label>
				      		)
				      	}				      
							</Segment>
						<CompareListview sendSong={this.getRightSong} query={this.state.resultRight} toDisplay={!this.state.boolRight} buttonClick={this.clickedRightSong.bind(this)} />
			      </Grid.Column>
			    </Grid.Row>   
			  </Grid>
			  <CompareDisplay query={toRender} leftSong={this.state.leftSongData} rightSong={this.state.rightSongData} />
			</div>
    );
  }
}


export default Compare;
