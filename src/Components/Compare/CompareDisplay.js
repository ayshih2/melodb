import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Grid, Segment, Label, Header } from 'semantic-ui-react';
import { VictoryPie, VictoryLabel, VictoryBar, VictoryChart, VictoryAxis } from 'victory';
import './Compare.scss';
import '../../variables.scss';

class CompareDisplay extends Component {
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
            barData: [{x: 'Waste It On Me', y: 5}, {x: 'Free Spirit', y: 5}]
    }

    this.bars = React.createRef();
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
  }

	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll, { passive: true })
	  this.setState({
	      pieData: [
							    { x: "I", y: 15},
							    { x: "You", y: 15},
							    { x: "Me", y:  40},
							    { x: "running", y: 10},
							    { x: "Dunno", y:  20}
	  ]})
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll(event) {
	  var rect = ReactDOM.findDOMNode(this.bars.current).getBoundingClientRect();
		if (rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
		) {
	    this.setState({
				barData: [{x: 'Waste It On Me', y: 30}, {x: 'Free Spirit', y: 60}]
	    });
		}
  }

	/* icon to search bar animation from https://codepen.io/sebastianpopp/pen/myYmmy with tweaks to make it for react */
  render() {
  	console.log("COMPARE " + this.props.query)
  	if (this.props.query == true) {
  		console.log("here :(((((((")
	    return (
				<Grid textAlign='center' columns='equal'>
			    <Grid.Row>
			      <Grid.Column>
			        <p className="lyrics">
								You say love is messed up<br />
								You say that it don't work<br />
								You don't wanna try, no, no<br />
								(You don't wanna try, no, no)<br />
								And baby, I'm no stranger<br />
								To heartbreak and the pain, of<br />
								Always being let go<br />
								And I know there's no making this right, this right<br />
								And I know there's no changing your mind, your mind (Your mind)<br />
								But we both found each other tonight, tonight<br />
								So if love is nothing more<br />
								Than just a waste of your time<br />
								Waste it on me<br />
								So we don't gotta go there<br />
								Past lovers and warfare<br />
								It's just you and me now<br />
								I don't know your secrets<br />
								But I'll pick up the pieces<br />
								Pull you close to me now (Yeah, yeah)<br />
								And I know there's no making this right, this right (Yeah)<br />
								And I know there's no changing your mind, your mind (Oh)<br />
								But we both found each other tonight, tonight (Oh, yeah)<br />
								So if love is nothing more<br />
								Than just a waste of your time<br />
								Waste it on me<br />
								Don't you think there must be a reason?<br />
								Yeah, like we had our names<br />
								Don't you think we got another season?<br />
								That come after spring<br />
								I wanna be your summer<br />
								I wanna be your wave<br />
								Treat me like a comma<br />
								And I'll take you to a new phrase<br />
								Ya, come just eat me and throw me away<br />
								If I'm not your taste, babe, waste<br />
								Waste it on me<br />
								And I know there's no making this right, this right (Yeah)<br />
								And I know there's no changing your mind, your mind (Oh)<br />
								But we both found each other tonight, tonight (Oh, yeah)<br />
								So if love is nothing more<br />
								Than just a waste of your time<br />
								Waste it on me<br />
								Waste it on me
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
								We were runnin' onto something<br />
								And we didn't say forever but it's all we wanted<br />
								You were so in love with simple things<br />
								And now we're searching for the fire, dripping kerosene<br />
								I've been lovin' more, livin' less<br />
								Off of highs and lows, so obsessed<br />
								Couldn't get nothin'<br />
								But we're never runnin' out, we'll be<br />
								Free spirits, free spirits<br />
								Can you hear me calling?<br />
								Oh, it's all or nothing<br />
								When you're free spirits, free spirits<br />
								Can you hear it calling?<br />
								'Cause I don't wanna live no normal life, let go<br />
								Is this Heaven or Armageddon?<br />
								Are we gettin' high, we could've watched the ending<br />
								We were trodding down our memories<br />
								A cemetery full of bottles that are incomplete<br />
								When you're loving more, caring less<br />
								It's the highs and lows with no clears<br />
								And we wanted it all then<br />
								But we're never runnin' out, we'll be<br />
								Free spirits, free spirits<br />
								Can you hear me calling?<br />
								Oh, it's all or nothing<br />
								When you're free spirits, free spirits<br />
								Can you hear it calling?<br />
								'Cause I don't wanna live no normal life, let go<br />
								So tell me when you're falling<br />
								Though I could never doubt our love<br />
								Can you hear me calling?<br />
								Is it everything you're dreaming of?<br />
								Leave it all on the line<br />
								As long as you're not leaving me, well I am yours<br />
								Yours<br />
								Free spirits<br />
								Free spirit<br />
								Free spirit<br />
								Free spirit
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
