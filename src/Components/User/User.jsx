import React, { Component } from 'react';
import './User.scss'
import { Header, Icon, Menu, Segment } from 'semantic-ui-react';
import { auth, googleAuthProvider } from '../../firebase.js';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import axios from 'axios';
import LikedTable from './Liked/Liked.jsx';
import RecommendedTable from './Recommended/Recommended.jsx';
import HistorySongTable from './History/HistorySong.jsx';
import HistoryCompTable from './History/HistoryComp.jsx';

class User extends Component {
  constructor() {
    super();
    this.state = {
      liked: [],
      recommended: [],
      songHistory: [],
      compHistory: []
    }
  }

  handleItemClick = (e, { name }) => {
    var likedBox = document.getElementById('lbox');
    var recommendedBox = document.getElementById('rbox');
    var historyBox = document.getElementById('hbox');

    if (name === 'liked') {
      likedBox.style.display = "block";
      recommendedBox.style.display = "none";
      historyBox.style.display = "none";
    } else if (name === 'recommended') {
      recommendedBox.style.display = "block";
      likedBox.style.display = "none";
      historyBox.style.display = "none";
    } else {
      historyBox.style.display = "block";
      likedBox.style.display = "none";
      recommendedBox.style.display = "none";
    }
    this.setState({ activeItem: name });
  }

  axiosGetLiked = (email) => {
    axios.get('http://localhost:5000/api/user/?email=' + email + '&type=liked')
    .then(
      res => {
        let info = res.data;
        let likedList = info.data;
        this.setState({liked: likedList});
      });
  }

  axiosGetRecommended = (email) => {
    axios.get('http://localhost:5000/api/user/?email=' + email + '&type=recommended')
    .then(
      res => {
        let info = res.data;
        let rec = info.data;
        this.setState({recommended: rec.top5RecommendedSongs});
    });
  }

  axiosGetHistory = (email) => {
    axios.get('http://localhost:5000/api/user/?email=' + email + '&type=history')
    .then(
      res => {
        let info = res.data;
        let history = info.data;
        let songs = history[0];
        let comps = history[1];
        this.setState({songHistory: songs, compHistory: comps});
    });
  }

  componentWillMount() {
    //is it good that it does this every time? no probably not
    //does it affect anything that it does this every time? no so who cares
    this.axiosGetLiked('testEmail');
    this.axiosGetRecommended('testEmail');
    this.axiosGetHistory('testEmail');
  }

  render() {
    const { activeItem } = this.state;

    return (
      <div className='user-container'>
        <Header as='h2' icon>
          <Icon name='settings' />
          Account Settings
          <Header.Subheader>Manage your account settings and set e-mail preferences.</Header.Subheader>
        </Header>
        <div className='menuWrapper'>
          <Menu borderless fluid widths={3} size="tiny">
            <Menu.Item color='purple' name='liked' className='user-menu-item' active={activeItem === 'liked'} onClick={this.handleItemClick} />
            <Menu.Item color='purple' name='recommended' className='user-menu-item' active={activeItem === 'recommended'} onClick={this.handleItemClick} />
            <Menu.Item color='purple' name='history' className='user-menu-item' active={activeItem === 'history'} onClick={this.handleItemClick} />
          </Menu>
          <div className='userBoxWrapper'>
            <Segment id='lbox' className='liked-box'>
              <LikedTable likedSongs={this.state.liked}/>
            </Segment>
            <Segment id='rbox'className='recommended-box'>
              <RecommendedTable recommendedSongs={this.state.recommended} />
            </Segment>
            <Segment id='hbox' className='history-box'>
              <HistorySongTable historySongs={this.state.songHistory} />
              <HistoryCompTable historyComps={this.state.compHistory} />
            </Segment>
          </div>
        </div>
      </div>
    );
  }
}

export default User;
