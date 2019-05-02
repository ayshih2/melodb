import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

class Header extends Component {
  state = { activeItem: 'search' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu stackable borderless size='large'>
      <Menu.Menu>
        <Menu.Item header>
          MeloDB: Top 100 Songs
        </Menu.Item>
        </Menu.Menu>
        <Menu.Menu position='right'>
          <Link to={process.env.PUBLIC_URL + '/'}>
            <Menu.Item
              name='search'
              active={activeItem === 'search'}
              onClick={this.handleItemClick}
            >
              Search
            </Menu.Item>
          </Link>
          <Link to={process.env.PUBLIC_URL + '/compare'}>
            <Menu.Item
              name='compare'
              active={activeItem === 'compare'}
              onClick={this.handleItemClick}
            >
              Compare
            </Menu.Item>
          </Link>
          <Link to={process.env.PUBLIC_URL + '/user'}>
            <Menu.Item
              name='user'
              active={activeItem === 'user'}
              onClick={this.handleItemClick}
            >
              User
            </Menu.Item>
          </Link>
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
