import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Grid, Segment, Label, Header } from 'semantic-ui-react';
import { VictoryPie, VictoryLabel, VictoryBar, VictoryChart, VictoryAxis } from 'victory';
import './Compare.scss';
import axios from 'axios';
import '../../variables.scss';

class CompareDisplay extends Component {
  constructor(props) {
    super(props);
		this.state = {
            pieData: [
									    { x: "", y: 0 },
									    { x: "", y: 0 },
									    { x: "", y:  0 },
									    { x: "", y: 0 },
									    { x: "", y: 100 }
            ],
            barData: [{x: '', y: 0}, {x: '', y: 0}],
            commonData: {},
            leftSong: {},
            rightSong: {},
    }

    this.bars = React.createRef();
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
  }

	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll, { passive: true })
		console.log(this.state.rightSong)

	 //  this.setState({
	 //      pieData: [
		// 	    { x: "I", y: 15},
		// 	    { x: "You", y: 15},
		// 	    { x: "Me", y:  40},
		// 	    { x: "running", y: 10},
		// 	    { x: "Dunno", y:  20}
	 //  		]
		// })
  }

   componentWillReceiveProps(nextProps) {
		if (nextProps.leftSong.songTitle && nextProps.rightSong.songTitle) {
	      //http://localhost:5000/api/compare/?song1=envy me&song2=old town roAD
	      console.log("this  " + nextProps.leftSong.songTitle)
	      console.log("next " + nextProps.rightSong.songTitle)

	    axios.get(`http://localhost:5000/api/compare/?song1=${nextProps.leftSong.songTitle}&song2=${nextProps.rightSong.songTitle}`)
      .then(res => {
        console.log("YEeEEEE");
        console.log(res);
        this.setState({
        	commonData: res.data.data,
        	leftSong: nextProps.leftSong,
        	rightSong: nextProps.rightSong,
		      pieData: [
				    { x: res.data.data.topFiveCommonWords[0].word, y: 20},
				    { x: res.data.data.topFiveCommonWords[1].word, y: 20},
				    { x: res.data.data.topFiveCommonWords[2].word, y: 20},
				    { x: res.data.data.topFiveCommonWords[3].word, y: 20},
				    { x: res.data.data.topFiveCommonWords[4].word, y: 20}
		  		]        	
        });
	    }).catch(error => {
	    	console.log("NOOOOO");
	    	console.log(error);
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
	        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
	        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
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
  	if (this.props.query == true) {
  		// format left song lyrics
  		var leftLyric = this.props.leftSong.lyrics.split('\\n');
	    var displayLeftLyrics = [];
	    leftLyric.forEach((elem, i) => {
	      displayLeftLyrics.push(elem);
	      if (i !== leftLyric.length - 1) {
	        displayLeftLyrics.push(<br />);
	      }
	    });

	    // format right song lyrics
	    var rightLyric = this.props.rightSong.lyrics.split('\\n');
	    var displayRightLyrics = [];
	    rightLyric.forEach((elem, i) => {
	      displayRightLyrics.push(elem);
	      if (i !== leftLyric.length - 1) {
	        displayRightLyrics.push(<br />);
	      }
	    });

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
				        		// TO DO!!!!!!!!!!!! LONGER WORDS like Armageddon WILL NOT FIT
									  data={this.state.pieData}
									  padAngle={2}
									  labelRadius={100}
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
	                  <Header.Content>Lyrics Sentiment Rating</Header.Content>
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
								    data: { fill: data => (data.x === this.state.barData[0].x ? "#003366" : "#800000")  } }}
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
