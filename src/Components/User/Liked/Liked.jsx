import React from 'react';
import '../User.scss'
import './Liked.scss';
import { Table, Image } from 'semantic-ui-react';

export default class LikedTable extends React.Component {
  render() {

    var rows = this.props.likedSongs.map((liked) => {

      return (
        <LikedRow
          liked = { liked }
          key = { liked.songName }
        />
      );
    });

    return (
      <Table basic='very'>
        <Table.Body>{ rows }</Table.Body>
      </Table>
    );
  }
}

class LikedRow extends React.Component {

  render() {
    const liked = this.props.liked;
    return (
      <Table.Row>
        <Table.Cell className="album-cell"><Image className="img-album" size="tiny" src={ liked.songArt }></Image></Table.Cell>
        <Table.Cell className="name-cell">{ liked.songName } by { liked.artist }</Table.Cell>
        <Table.Cell className="date-cell">{ liked.likedDate }</Table.Cell>
      </Table.Row>
    );
  }
}
