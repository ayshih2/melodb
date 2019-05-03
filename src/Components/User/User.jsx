import React, { Component } from 'react';
import './User.scss'
import { Image, Menu, Segment, Loader } from 'semantic-ui-react';
import axios from 'axios';
import LikedTable from './Liked/Liked.jsx';
import RecommendedTable from './Recommended/Recommended.jsx';
import HistorySongTable from './History/HistorySong.jsx';
import HistoryCompTable from './History/HistoryComp.jsx';
import firebase from 'firebase';
import Login from '../Login/Login.jsx';

class User extends Component {
  constructor() {
    super();
    this.state = {
      liked: [],
      recommended: [],
      songHistory: [],
      compHistory: [],
      activeItem: 'recommended',
      isLoading: true
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
    axios.get('https://melodb-uiuc.herokuapp.com/api/user/?email=' + email + '&type=liked')
    .then(
      res => {
        let info = res.data;
        let likedList = info.data;
        this.setState({liked: likedList});
      });
  }

  axiosGetRecommended = (email) => {
    axios.get('https://melodb-uiuc.herokuapp.com/api/user/?email=' + email + '&type=recommended')
    .then(
      res => {
        let info = res.data;
        let rec = info.data;
        this.setState({recommended: rec.top5RecommendedSongs});
    });
  }

  axiosGetHistory = (email) => {
    axios.get('https://melodb-uiuc.herokuapp.com/api/user/?email=' + email + '&type=history')
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

    let saveThis = this;
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        saveThis.axiosGetLiked(user.email);
        saveThis.axiosGetRecommended(user.email);
        saveThis.axiosGetHistory(user.email);
      } else {
        // No user is signed in.
      }
      this.setState({isLoading: false});
    });
  }

  render() {
    const { activeItem } = this.state;

    if(this.state.isLoading) {
      return (
        <div>
					<Loader active inlined='centered'/>
        </div>
      )
    }

    if (!firebase.auth().currentUser) {
      return <Login redirectUrl='/user'/>
    }

    return (
      <div className='user-container'>
        <div className='user-header'>
          <Image circular size='small' src={firebase.auth().currentUser.photoURL} />
          <h2>{firebase.auth().currentUser.displayName}</h2>
        </div>
        <div className='menuWrapper'>
          <Menu id='menu' borderless fluid widths={3} size="tiny">
            <Menu.Item color='purple' name='recommended' className='user-menu-item' active={activeItem === 'recommended'} onClick={this.handleItemClick} />
            <Menu.Item color='purple' name='liked' className='user-menu-item' active={activeItem === 'liked'} onClick={this.handleItemClick} />
            <Menu.Item color='purple' name='history' className='user-menu-item' active={activeItem === 'history'} onClick={this.handleItemClick} />
          </Menu>
          <div className='userBoxWrapper'>
            <Segment id='rbox'className='recommended-box'>
              <RecommendedTable recommendedSongs={this.state.recommended} />
            </Segment>
            <Segment id='lbox' className='liked-box'>
              <LikedTable likedSongs={this.state.liked}/>
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
