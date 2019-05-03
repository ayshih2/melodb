import React, { Component } from 'react';
import { Button, Header, List, Image, Icon, Segment, Grid, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './Display.scss';
import axios from 'axios';
import firebase from 'firebase';
import logo from './musical-note.svg';

class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
      related: []
    }
    this.song = this.props.params.location.state.query;
    this.toggleLike = this.toggleLike.bind(this);
    const config = {
      baseURL: 'https://melodb-uiuc.herokuapp.com/api',
      url: `user?email=${firebase.auth().currentUser.email}&type=liked`
    }
    axios(config).then(res => {
      var idx = res.data.data.findIndex(elem => elem.songName.toLowerCase() === this.song.songTitle.toLowerCase());
      if (idx !== -1) {
        this.setState({
          liked: true
        });
      } else {
        this.setState({
          liked: false
        });
      }
    }).catch(err => {
      console.log(err);
    });
  }

  componentDidMount() {
    this.song.relatedSongs.map(async song => {
      const config = {
        baseURL: 'https://melodb-uiuc.herokuapp.com/api',
        url: `song?name=${song}`
      }
      axios(config).then(res => {
        this.setState({
          related: this.state.related.concat(res.data.data[0])
        });
      }).catch(err => {
        console.log(err);
      });
    });
    const config = {
      method: 'put',
      baseURL: 'https://melodb-uiuc.herokuapp.com/api',
      url: `user?email=${firebase.auth().currentUser.email}&type=history&add=song`,
      data: {
        songName: this.song.songTitle
      }
    }
    axios(config).then(res => {
      console.log('Success');
    }).catch(err => {
      console.log(err);
    })
  }

  toggleLike() {
    this.setState({
      liked: !this.state.liked
    }, () => {
      const config = {
        method: 'post',
        baseURL: 'https://melodb-uiuc.herokuapp.com/api',
        url: `user?email=${firebase.auth().currentUser.email}&type=liked`,
        data: {
          songName: this.song.songTitle
        }
      }
      axios(config).then(res => {
        console.log('Success');
      }).catch(err => {
        console.log(err);
      });
    });
  }

  render() {
    if (!this.state.liked) {
      var heart = <Icon name='heart outline' size='large' onClick={this.toggleLike} className='Unliked' />
    } else {
      heart = <Icon name='heart' size='large' onClick={this.toggleLike} className='Liked' />
    }
    const relatedSongs = this.state.related.map((elem, idx) => {
      return (
        <List.Item key={idx}>
          <Link to={{
            pathname: `${process.env.PUBLIC_URL}/display/${elem.songTitle}`,
            state: {
              query: elem
            }
          }}>
          <div className='list-wrapper'>
            <Image size='tiny' circular src={elem.albumImgUrl} />
            <List.Content className="listContent">
              <List.Header className="listHeader" as='a'>{elem.songTitle}</List.Header>
              <List.Description>{elem.artist}</List.Description>
            </List.Content>
            </div>
          </Link>
        </List.Item>
      );
    });
    var lyric = this.song.lyrics.split('\\n');
    var displayLyrics = [];
    lyric.forEach((elem, i) => {
      displayLyrics.push(elem);
      if (i !== lyric.length - 1) {
        displayLyrics.push(<br />);
      }
    });
    return (
        <div className='grid'>
          <Link to={`${process.env.PUBLIC_URL}/`}>
            <Button icon='arrow left' />
          </Link>
          <Grid columns='equal'>
            <Grid.Row>
              <Grid.Column>
                <div className='display-container'>
                  <div className='image'>
                    <Image size='small' src={this.song.albumImgUrl} avatar />
                  </div>
                  <div className='header'>
                    <div>
                      <Header
                        as = 'h2'
                        content = {this.song.songTitle}
                        subheader= {this.song.artist}
                      />
                    </div>
                  </div>
                  <div className='heart'>{heart}</div>
                </div>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Segment raised>
                  <Label style={{fontFamily:'Lato', fontSize:'15px'}} as='a' color='purple' ribbon>
                    Lyrics
                  </Label>
                  <div className='lyrics'>
                  <p>{displayLyrics}</p>
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
                          <Header.Content>Related Songs</Header.Content>
                        </Header>
                      </Label>
                    </div>
                    <List relaxed='very' divided animated verticalAlign='middle'>
                     {relatedSongs}
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
