import React, { Component } from 'react';
import { Image, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './Listview.scss';

class Listview extends Component {
  render() {
    const empty = Object.entries(this.props.query).length === 0;
    if (!empty) {
      const listview = this.props.query.map((song, idx) => {
        return(
          <List.Item key={idx}>
            <div className='container'>
              <div><Image size='tiny' src={song.albumImgUrl} /></div>
              <div className='item'>
                <List.Content>
                  <List.Header>{song.songTitle}</List.Header>
                  <List.Description><i>{song.artist}</i></List.Description>
                </List.Content>
              </div>
            </div>
          </List.Item>
        )
      });
      return(
        <div className='list'>
          <List divided animated relaxed='very' verticalAlign='middle' >
            {listview}
          </List>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Listview;
