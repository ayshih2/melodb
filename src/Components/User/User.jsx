import React, { Component } from 'react';
import './User.scss'
import { Header, Icon, Menu, Segment } from 'semantic-ui-react';
import { auth, googleAuthProvider } from './firebase.js';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import axios from 'axios';

class User extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  }

  axiosGetLiked = (email) => {
    axios.get('localhost:3000/api/user?email=' + email + '&type=liked').then(
      res => {
        let likedList = res.data;
        
      }

    );
  }

  render() {
    const { activeItem } = this.state;

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
            <Segment id='likedBox'>

            </Segment>
          </div>
        </div>
      </div>
    );
  }
}

export default User;
