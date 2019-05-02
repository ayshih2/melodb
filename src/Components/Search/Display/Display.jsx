import React, { Component } from 'react';
import { Header, List, Image, Icon, Segment, Item, Grid, Label } from 'semantic-ui-react';
import './Display.scss';
import logo from './musical-note.svg';

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
    }, () => {
      const config = {
        method: 'post',
        baseURL: 'http://localhost:5000/api',
        url: `user?email=${auth.currentUser.email}&type=liked`,
        data: {
          songName: {this.props.query.songTitle}
        }
      axios(config).then((res) => {
        console.log('Success');
      }).catch(err => {
        console.log(err);
      });
    });
  }

  render() {
    if (!this.state.liked) {
      var heart = <Icon name='heart outline' size='small' onClick={this.toggleLike} className='Unliked' />
    } else {
      heart = <Icon name='heart' size='small' onClick={this.toggleLike} className='Liked' />
    }
    //if (this.props.query) {
      return (
        <div className='grid'>
          <Grid columns='equal'>
            <Grid.Row>
              <Grid.Column>
                <div className='container'>
                  <div className='image'>
                    <Image size='small' src='https://images.genius.com/7dae2bd55960517e764f5194d2af0194.600x600x1.jpg' avatar />
                  </div>
                  <div className='header'>
                    <div>
                      <Header
                        as='h2'
                        content='Our Love is Great'
                        subheader='Baek Yerin'
                      />
                    </div>
                    <div>{heart}</div>
                  </div>
                </div>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Segment raised>
                  <Label style={{fontFamily:'Lato'}} as='a' color='red' ribbon>
                    Lyrics
                  </Label>
                  <div className='lyrics'>
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
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment>
                  <div className='Recommended'>
                    <div className='recommendedHeader'>
                      <Label attached='top'>
                        <Header as='h2' >
                          <Image size='tiny' src={logo} />
                          <Header.Content>Recommended</Header.Content>
                        </Header>
                      </Label>
                    </div>
                    <List relaxed='very' divided animated verticalAlign='middle'>
                      <List.Item>
                        <Image size='tiny' circular src='https://is2-ssl.mzstatic.com/image/thumb/Music123/v4/a3/ec/71/a3ec718e-9c61-4a45-a839-cd817d40088b/cover.jpg/600x600bf.png' />
                        <List.Content className="listContent">
                          <List.Header className="listHeader" as='a'>EungbongGyo</List.Header>
                          <List.Description>EungbongGyo</List.Description>
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <Image size='tiny' circular src='https://is5-ssl.mzstatic.com/image/thumb/Music1/v4/78/40/5f/78405ff1-d2a8-7fb0-a3d6-6d3940ae4dc9/cover-.jpg/600x600bf.png' />
                        <List.Content>
                          <List.Header as='a'> BirdPaper</List.Header>
                          <List.Description>Artist 2</List.Description>
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <Image size='tiny' circular src='http://image.melon.co.kr/cm/album/images/026/80/986/2680986_500.jpg' />
                        <List.Content>
                          <List.Header as='a'>Galaxy</List.Header>
                          <List.Description>BB4</List.Description>
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <Image size='tiny' circular src='https://images.genius.com/7dae2bd55960517e764f5194d2af0194.600x600x1.jpg' />
                        <List.Content>
                          <List.Header as='a'>Maybe It's Not Our Fault</List.Header>
                          <List.Description>Baek Yerin</List.Description>
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <Image size='tiny' circular src='https://is5-ssl.mzstatic.com/image/thumb/Music6/v4/88/86/39/88863915-f746-c1ff-00f6-049a8baf06b1/COVER-.jpg/1200x630bb.jpg' />
                        <List.Content>
                          <List.Header as='a'>The Shower</List.Header>
                          <List.Description>IU</List.Description>
                        </List.Content>
                      </List.Item>
                    </List>
                  </div>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>

      );
  }
}

export default Display;
