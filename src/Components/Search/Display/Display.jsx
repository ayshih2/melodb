import React, { Component } from 'react';
import { Header, List, Image, Icon } from 'semantic-ui-react';
import './Display.scss';

class Display extends Component {
  constructor() {
    super();
    this.state = {
      liked: false
    }
    this.toggleLike = this.toggleLike.bind(this);
  }

  toggleLike() {
    this.setState({
      liked: !this.state.liked
    });
  }

  render() {
    if (!this.state.liked) {
      var heart = <Icon name='heart outline' size='small' onClick={this.toggleLike} className='Unliked' />
    } else {
      heart = <Icon name='heart' size='small' onClick={this.toggleLike} className='Liked' />
    }
    return (
      <div className='Card'>
        <div className='Header'>
          <div className='HeaderImage'></div>
          <div className='HeaderContent'>
            <div><Image circular size='small' src='https://images.genius.com/7dae2bd55960517e764f5194d2af0194.600x600x1.jpg' /></div>
            <div>
              <Header as='h1'>
                <div className='Song'>
                  Our love is great
                  <div>{heart}</div>
                </div>
                <Header.Subheader>Baek Yerin</Header.Subheader>
              </Header>
            </div>
          </div>
        </div>
        <div className='CardBody'>
          <div className='Left'>
            <div className='Lyrics'>
              <h1>LYRICS</h1>
              <p>
                I wasn’t welcomed there <br/>
                They all want me out <br/>
                Do I really have the reason or <br/>
                Should I just leave
              </p>
              <p>
                I said <br/>
                I won’t come around here no more <br/>
                But take a bit easy on me <br/>
                Cause my friends are weirder than me <br/>
                You know how we are
              </p>
              <p>
                We only <br/>
                (Want a little sympathy and hopes) <br/>
                Know how to be loved
              </p>
              <p>
                We were only <br/>
                (Small amount of poison <br/>
                But not in your blood) <br/>
                Taught by great great love
              </p>
              <p>
                We weren’t welcomed there <br/>
                They all want us out <br/>
                Do we really have the reason or <br/>
                Should we just go
              </p>
              <p>
                We won’t stay around here no more <br/>
                But if you would need us to help <br/>
                You with our love <br/>
                We are glad to be with you
              </p>
              <p>
                We only <br/>
                (Want a little sympathy and hopes) <br/>
                Know how to be loved
              </p>
              <p>
                We were only <br/>
                (Small amount of poison <br/>
                But not in your blood) <br/>
                Taught by great great love
              </p>
              <p>
                Yes we are
              </p>
              <p>
                Sing along with me
              </p>
            </div>
          </div>
          <div className='Right'>
            <div className='Recommended'>
              <Header as='h2' icon='sound' content='Recommended Songs' />
              <List divided animated verticalAlign='middle'>
                <List.Item>
                  <Image avatar src='https://is2-ssl.mzstatic.com/image/thumb/Music123/v4/a3/ec/71/a3ec718e-9c61-4a45-a839-cd817d40088b/cover.jpg/600x600bf.png' />
                  <List.Content>
                    <List.Header as='a'>EungbongGyo</List.Header>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <Image avatar src='https://is5-ssl.mzstatic.com/image/thumb/Music1/v4/78/40/5f/78405ff1-d2a8-7fb0-a3d6-6d3940ae4dc9/cover-.jpg/600x600bf.png' />
                  <List.Content>
                    <List.Header as='a'>Paper Bird</List.Header>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <Image avatar src='http://image.melon.co.kr/cm/album/images/026/80/986/2680986_500.jpg' />
                  <List.Content>
                    <List.Header as='a'>Galaxy</List.Header>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <Image avatar src='https://images.genius.com/7dae2bd55960517e764f5194d2af0194.600x600x1.jpg' />
                  <List.Content>
                    <List.Header as='a'>Maybe It's Not Our Fault</List.Header>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <Image avatar src='https://is5-ssl.mzstatic.com/image/thumb/Music6/v4/88/86/39/88863915-f746-c1ff-00f6-049a8baf06b1/COVER-.jpg/1200x630bb.jpg' />
                  <List.Content>
                    <List.Header as='a'>The Shower</List.Header>
                  </List.Content>
                </List.Item>
              </List>
            </div>
          </div></div>
      </div>
    );
  }
}

export default Display;
