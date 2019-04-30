import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

class Header extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu stackable borderless>
      <Menu.Menu position='center'>
        <Menu.Item>
          <img src='/logo.png' />
        </Menu.Item>
        </Menu.Menu>
        <Menu.Menu position='right'>
          <Menu.Item
            name='search'
            active={activeItem === 'search'}
            onClick={this.handleItemClick}
          >
            Search
          </Menu.Item>

          <Menu.Item
            name='compare'
            active={activeItem === 'compare'}
            onClick={this.handleItemClick}
          >
            Compare
          </Menu.Item>

          <Menu.Item
            name='user'
            active={activeItem === 'user'}
            onClick={this.handleItemClick}
          >
            User
          </Menu.Item>
          
          <Menu.Item
            name='sign-out'
            active={activeItem === 'sign-out'}
            onClick={this.handleItemClick}
          >
            Sign Out
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}

export default Header;
