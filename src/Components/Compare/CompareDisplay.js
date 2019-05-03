import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Grid, Segment, Label, Header } from 'semantic-ui-react';
import { VictoryPie, VictoryLabel, VictoryBar, VictoryChart, VictoryAxis } from 'victory';
import firebase from 'firebase';
import './Compare.scss';
import axios from 'axios';
import '../../variables.scss';

class CompareDisplay extends Component {
  constructor(props) {
    super(props);
		this.state = {
      pieData: [
						    { x: "", y: 100 },
						    { x: "", y: 0 },
						    { x: "", y: 0 },
						    { x: "", y: 0 },
						    { x: "", y: 0 }
      ],
      animateData: false,
      barData: [{x: '', y: 0}, {x: '', y: 0}],
      commonData: {},
      leftSong: {},
      rightSong: {},
      selectedCommonWord: '',
      commonWordNum: 0,
    }

    this.bars = React.createRef();
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
  }

	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll, { passive: true })
  }

   componentWillReceiveProps(nextProps) {
		if (nextProps.leftSong.songTitle && nextProps.rightSong.songTitle) {
			console.log("new props " + nextProps);

			// put comparison into user history
			if (firebase.auth().currentUser) {
		    const config = {
		      method: 'put',
		      baseURL: 'https://melodb-uiuc.herokuapp.com/api',
		      url: `user?email=${firebase.auth().currentUser.email}&type=history&add=comparison`,
		      data: {
		        songName1: nextProps.leftSong.songTitle,
		        songName2: nextProps.rightSong.songTitle,
		      }
		    }
		    axios(config).then(res => {
		      console.log('Success');
		    }).catch(err => {
		      console.log(err);
		    })
			}

	    // get data
	    axios.get(`https://melodb-uiuc.herokuapp.com/api/compare/?song1=${nextProps.leftSong.songTitle}&song2=${nextProps.rightSong.songTitle}`)
      .then(res => {
        console.log(res);

        // since percentages are decimals, make sure they add up to 100
        var sumOfRounded = 0;
        var roundedNums = [];

        var data = [];
        var sharedWords = [];
        for (var i = 0; i < 5; i++) {
        	if (res.data.data.topFiveCommonWords[i]) {
        		console.log("shared words " + i + " " + res.data.data.topFiveCommonWords[i].word);
        		sharedWords.push(res.data.data.topFiveCommonWords[i].word);
        		roundedNums.push(Math.floor(res.data.data.topFiveCommonWords[i].percentage * 100));
        		sumOfRounded += Math.floor(res.data.data.topFiveCommonWords[i].percentage * 100);
        		data.push({x: sharedWords[i], y: roundedNums[i]})
        	} else {
        		sharedWords.push("");
        		roundedNums.push(0);
        		data.push({x: "", y: 0})
        	}
        }

        var diff = 100 - sumOfRounded;
        for (var j = 0; j < diff; j++) {
        	roundedNums[j] += 1;
        }

        var animate = true;

        if (data.length !== 5) {
        	animate = false;
        }
        this.setState({
        	commonData: res.data.data,
        	leftSong: nextProps.leftSong,
        	rightSong: nextProps.rightSong,
        	pieData: data,
        	animateData: animate,
        });
	    }).catch(error => {
	    	console.log(error);
	    });
		} else {
			this.setState({
			    pieData: [{ x: "", y: 100 }, { x: "", y: 0 }, { x: "", y:  0 },
							{ x: "", y: 0 },
							{ x: "", y: 0 }
			      ],
			      barData: [{x: '', y: 0}, {x: '', y: 0}],
			      commonData: {},
			      leftSong: {},
			      rightSong: {},
			      selectedCommonWord: '',
			      selectedCommonWordNum: 0
			});
		}
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll(event) {
  	if (this.props.query) {
		  var rect = ReactDOM.findDOMNode(this.bars.current).getBoundingClientRect();
			if (rect.top >= 0 &&
	        rect.left >= 0 &&
	        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
	        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
			) {
		    this.setState({
					barData: [{x: this.state.leftSong.songTitle, y: this.state.commonData.song1Sentiment},
										{x: this.state.rightSong.songTitle, y: this.state.commonData.song2Sentiment}]
		    });
			}
  	}
  }

	/* icon to search bar animation from https://codepen.io/sebastianpopp/pen/myYmmy with tweaks to make it for react */
  render() {
  	if (this.props.query === true) {
  		// format left song lyrics
  		var commonWordIdx = -1;
  		if (this.state.commonData.topFiveCommonWords) {
	  		// find index of selected word in commonData to get associated lyrics
	  		for (var i = 0; i < this.state.commonData.topFiveCommonWords.length; i++) {
	  			if (this.state.commonData.topFiveCommonWords[i].word === this.state.selectedCommonWord) {
	  				commonWordIdx = i;
	  				break;
	  			}
	  		}

	  		// format left song lyrics
	  		var leftLyric = this.props.leftSong.lyrics.split('\\n');
	  		var leftToHighlight = (commonWordIdx !== -1) ? this.state.commonData.topFiveCommonWords[commonWordIdx].song1Lyrics : [];
	  		var leftIdx = 0;
		    var displayLeftLyrics = [];
		    leftLyric.forEach((elem, i) => {
		    	if (leftToHighlight[leftIdx] && elem.toLowerCase() === leftToHighlight[leftIdx].toLowerCase() && i !== leftLyric.length - 1) {
		    		displayLeftLyrics.push(<span className="leftLyrics">{elem}</span>);
		    		displayLeftLyrics.push(<br />);
		    		leftIdx += 1;
		    	} else if (i !== leftLyric.length - 1) {
		    		displayLeftLyrics.push(elem);
		    		displayLeftLyrics.push(<br />);
		    	} else {
						displayLeftLyrics.push(elem);
		    	}
		    });

			  // format right song lyrics
		    var rightLyric = this.props.rightSong.lyrics.split('\\n');
	  		var rightToHighlight = (commonWordIdx !== -1) ? this.state.commonData.topFiveCommonWords[commonWordIdx].song2Lyrics : [];
	  		var rightIdx = 0;
		    var displayRightLyrics = [];
		    rightLyric.forEach((elem, i) => {
		    	if (rightToHighlight[rightIdx] && elem.toLowerCase() === rightToHighlight[rightIdx].toLowerCase() && i !== rightLyric.length - 1) {
		    		displayRightLyrics.push(<span className="rightLyrics">{elem}</span>);
		    		displayRightLyrics.push(<br />);
		    		rightIdx += 1;
		    	} else if (i !== rightLyric.length - 1) {
		    		displayRightLyrics.push(elem);
		    		displayRightLyrics.push(<br />);
		    	} else {
						displayRightLyrics.push(elem);
		    	}
		    });

  		}

	    return (
				<Grid textAlign='center' columns='equal'>
			    <Grid.Row>
			      <Grid.Column>
			        <p className="lyrics">
								{displayLeftLyrics}
			        </p>
			      </Grid.Column>
			      <Grid.Column width={7}>
	   						<svg viewBox="0 0 400 400">

				        	<VictoryPie
										animate={{ duration: 1000, onLoad: { duration: 1500 } }}
					          standalone={false}
					          width={400} height={400}
				        		innerRadius={68}
								    events={[{
								      target: "data",
								      eventHandlers: {
								        onClick: () => {
								          return [
								            {
								            	// clear all colors
								              target: "data",
								              eventKey: "all",
								              mutation: () => {
								              	return { style: undefined };
								              }
								            },
								            {
								            	// highlight clicked section
								              target: "data",
								              mutation: (props) => {
								                const fill = props.style && props.style.fill;
								                return fill === "#800080" ? null : { style: { fill: "#800080" } };
								              }
								            },
								            {
								            	target: "labels",
								            	mutation: (props) => {
								         				this.setState({selectedCommonWord: props.text});
								            	}
								            }
								          ];
								        },
								        onMouseOver: () => {
								          return [
								            {
								              target: "data",
								              mutation: (props) => {
								              	if ((props.style && props.style.fill) !== "#800080") {
								              		return { style: { fill: "#d896ff" } }
								              	} else {
								              		return { style: { fill: "#800080" } }
								              	}
								              }
								            }
								          ];
								        },
								        onMouseOut: () => {
								          return [
								            {
								              target: "data",
								              mutation: (props) => {
								              	if ((props.style && props.style.fill) !== "#800080") {
								              		return {};
								              	} else {
								              		return { style: { fill: "#800080" } }
								              	}
								              }
								            }
								          ];
								        },
								      }
								    }]}
								    // longer words won't fit
									  data={this.state.pieData}
									  // only have padding between slices if there's more than one slice
									  padAngle={(this.state.pieData.length <= 1) ? 0 : 2}
									  labelRadius={100}
									  //labels={(d) => d.x}
									  style={{ labels: { fill: "white", fontSize: 10, fontWeight: "bold", fontFamily: "Lato" } }}
								  />
					        <VictoryLabel
					          textAnchor="middle"
					          style={{ fontSize: 20, fontFamily: "Lato" }}
					          x={200} y={200}
					          text={['Top 5', 'Common', 'Words']}
					        />
				      	</svg>
			      </Grid.Column>
			      <Grid.Column>
			        <p className="lyrics">
			        	{displayRightLyrics}
			        </p>
			      </Grid.Column>
			    </Grid.Row>
			    <Grid.Row>
			    	<Grid.Column>
			    		<Segment padded>
				    		<Label attached='top' className='sentimentRatingText'>
				    		  <Header as='h3' >
	                  <Header.Content>Lyrics Positive Sentiment Rating</Header.Content>
	                </Header>
				    		</Label>
							  <VictoryChart
								  style={{ parent: { maxWidth: "100%" } }}
								  height={150}>
									<VictoryBar horizontal
										height={125}
										ref={this.bars}
								    data={this.state.barData}
								    labels={(d) => d.x + ': ' + Math.round(d.y)}
								    y0={0}
								    domain={ {y: [0, 100]} }
								    style={{ labels: { fill: "black", fontSize: 6, fontFamily: "Lato"},
								    // #003366 is dark blue, #800000 is maroon
								    data: { fill: data => (data.x === this.state.barData[0].x ? "#800000": "#003366")  } }}
								    animate={{ duration: 2000 }}
									/>
							    <VictoryAxis dependentAxis
							      style={{
									    axis: {stroke: "#756f6a"},
									    axisLabel: {fontSize: 1, padding: 30},
									    ticks: {stroke: "grey", size: 5},
									    tickLabels: {fontSize: 7, padding: 5, fontFamily: "Lato"}
									  }}
									  tickValues={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
									  standalone={false}
							    	offsetY={30}
							    />
							  </VictoryChart >
						  </Segment>
			    	</Grid.Column>
			    </Grid.Row>
			  </Grid>
	    )
  	} else {
  		return null;
  	}

  }
}


export default CompareDisplay;
