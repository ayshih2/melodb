import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Grid, Segment, Progress } from 'semantic-ui-react';
import { VictoryPie, VictoryLabel, VictoryBar } from 'victory';
import './Compare.scss';
import '../../variables.scss';

class Compare extends Component { 
  constructor(props) {
    super(props);
		this.state = {
            pieData: [
									    { x: "I", y: 0 },
									    { x: "You", y: 0 },
									    { x: "Me", y:  0},
									    { x: "Word", y: 0 },
									    { x: "Dunno", y: 100 }
            ],
            barData: [{x: 'Waste It On Me', y: 5}, {x: 'Free Spirit', y: 5}]
    }

    this.leftSearchRef = React.createRef();
    this.rightSearchRef = React.createRef();
    this.bars = React.createRef();
    this._onBlur = this._onBlur.bind(this);
    this._onLeftFocus = this._onLeftFocus.bind(this);
    this._onRightFocus = this._onRightFocus.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
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
		window.addEventListener('scroll', this.handleScroll, { passive: true })
	  this.setState({
	      pieData: [
							    { x: "I", y: 15 },
							    { x: "You", y: 15 },
							    { x: "Me", y:  40},
							    { x: "running", y: 10 },
							    { x: "Dunno", y:  20 }
	  ]})
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll(event) {
	  //console.log(this.bars)
	  var rect = ReactDOM.findDOMNode(this.bars.current).getBoundingClientRect();
	  //console.log(this.state.reloadedBars);
		if (rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
		) {
			console.log('In the viewport!');
	    this.setState({
				barData: [{x: 'Waste It On Me', y: 30}, {x: 'Free Spirit', y: 60}]
	    });		
		} 
		// else {
		// 	console.log('Not in the viewport... whomp whomp');
		// 	this.setState({barData: [{x: 'Waste It On Me', y: 5, y0: 1}, {x: 'Free Spirit', y: 10, y0: 1}]});
		// }
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
									<input ref={this.leftSearchRef} id="left_inpt_search" type="text" />
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
								                return fill === "#c43a31" ? null : { style: { fill: "#c43a31" } };					              	
								              }							            	
								            }
								          ];
								        }
								      }
								    }]}			        		
				        		// TO DO!!!!!!!!!!!! LONGER WORDS like Armageddon WILL NOT FIT 
									  data={this.state.pieData}
									  padAngle={2}
									  labelRadius={100}
									  style={{ labels: { fill: "white", fontSize: 10, fontWeight: "bold", fontFamily: "Comfortaa" } }}		        	
								  /> 
					        <VictoryLabel
					          textAnchor="middle"
					          style={{ fontSize: 20, fontFamily: "Comfortaa" }}
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
  						<VictoryBar horizontal
  							height={125}
  							ref={this.bars}
						    data={this.state.barData}
						    labels={(d) => d.x}
						    y0={0}
						    domain={ {y: [0, 100]} }
						    style={{ labels: { fill: "black", fontSize: 6, fontFamily: "Comfortaa"}, data: { fill: "#c43a31" } }}	
						    animate={{ duration: 2000 }}	  
  						/>
			    	</Grid.Column>
			    </Grid.Row>
			  </Grid>				
			</div>	
    );
  }
}


export default Compare;