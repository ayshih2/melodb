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
            name='features'
            active={activeItem === 'features'}
            onClick={this.handleItemClick}
          >
            Search
          </Menu.Item>

          <Menu.Item
            name='testimonials'
            active={activeItem === 'testimonials'}
            onClick={this.handleItemClick}
          >
            Compare
          </Menu.Item>

          <Menu.Item
            name='sign-in'
            active={activeItem === 'sign-in'}
            onClick={this.handleItemClick}
          >
            User
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}

export default Header;
