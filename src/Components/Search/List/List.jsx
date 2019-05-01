import React, { Component } from 'react'
import { Image, List } from 'semantic-ui-react'
import style from './List.scss'

class Listview extends Component {
  render() {
    const empty = Object.entries(this.props.query).length === 0;
    if (!empty) {
      const listview = this.props.query.results.map((song, idx) => {
        return(
          <List.Item key={idx}>
            <div className='container'>
              <div>
              <Image size='tiny' src={`https://image.tmdb.org/t/p/w200${song.albumImgUrl}`} />
              </div>
              <div className='item'>
                <List.Content>
                  <List.Header>{song.songTitle}</List.Header>
                  <List.Description><i>{`(${song.artist})`}</i></List.Description>
                </List.Content>
            </div>
            </div>
          </List.Item>
        )
      });
      return(
        <List divided animated relaxed='very'>
          {listview}
        </List>
      );
    } else {
      return null;
    }
  }
}

export default Listview;
