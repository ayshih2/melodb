import React, { Component } from 'react';
import '../User.scss'
import './Recommended.scss';
import { Table, Image } from 'semantic-ui-react';

export default class RecommendedTable extends Component {
  render() {

    var rows = this.props.recommendedSongs.map((recommended) => {

      return (
        <RecommendedRow
          recommended = { recommended }
          key = { recommended.song.songTitle }
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

class RecommendedRow extends React.Component {

  render() {
    const recommended = this.props.recommended;
    return (
      <Table.Row>
        <Table.Cell className="album-cell"><Image className="img-album" size="tiny" src={ recommended.song.albumImgUrl }></Image></Table.Cell>
        <Table.Cell className="name-cell">{ recommended.song.songTitle } by { recommended.song.artist }</Table.Cell>
      </Table.Row>
    );
  }
}
