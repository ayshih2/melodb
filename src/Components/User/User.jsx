import React, { Component } from 'react';
import './User.scss'
import { Header, Icon, Menu, Segment } from 'semantic-ui-react';
import { auth, googleAuthProvider } from '../../firebase.js';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import axios from 'axios';
import LikedTable from './Liked/Liked.jsx';

class User extends Component {
  constructor() {
    super();
    this.state = {
      liked: [],
    }
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  }

  axiosGetLiked = (email) => {
    axios.get('http://localhost:5000/api/user?email=' + email + '&type=liked')
    .then(
      res => {
        let info = res.data;
        let likedList = info.data;
        this.setState({liked: likedList});
      });
  }

  axiosGetRecommended = (email) => {
    axios.get('http://localhost:5000/api/user?email=' + email + '&type=recommended')
    .then(
      res => {
        
      }
    });
  }

  componentDidMount() {
    this.axiosGetLiked('testEmail');
  }

  render() {
    const { activeItem } = this.state;
    
    const touched = this.state.touched;
    const liked = this.state.liked;


    return (
      <div className='container'>
        <Header as='h2' icon>
          <Icon name='settings' />
          Account Settings
          <Header.Subheader>Manage your account settings and set e-mail preferences.</Header.Subheader>
        </Header>
        <div className='menuWrapper'>
          <Menu borderless fluid widths={3} size="tiny">
            <Menu.Item color='blue' name='liked' active={activeItem === 'liked'} onClick={this.handleItemClick} />
            <Menu.Item color='blue' name='recommended' active={activeItem === 'recommended'} onClick={this.handleItemClick} />
            <Menu.Item color='blue' name='history' active={activeItem === 'history'} onClick={this.handleItemClick} />
          </Menu>
          <div className='userBoxWrapper'>
            <Segment className='likedBox'>
              <LikedTable likedSongs={this.state.liked}/>
            </Segment>
            <Segment className='recommended-box'>
              hello friends and family
            </Segment>
          </div>
        </div>
      </div>
    );
  }
}

export default User;
