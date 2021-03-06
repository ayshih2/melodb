import React, { Component } from 'react';
import '../User.scss'
import './History.scss';
import { Table, Image } from 'semantic-ui-react';

export default class HistorySongTable extends Component {
  render() {

    var rows = this.props.historySongs.map((shistory, idx) => {

      return (
        <SongHistoryRow
          key={idx}
          history = { shistory }
        />
      );
    });

    return (
      <Table basic='very'>
        <Table.Header className="h-header">Songs</Table.Header>
        <Table.Body>{ rows }</Table.Body>
      </Table>
    );
  }
}

class SongHistoryRow extends React.Component {

  render() {
    const history = this.props.history;
    return (
      <Table.Row>
        <Table.Cell className="h-album-cell"><Image className="img-album" size="tiny" src={ history.songArt }></Image></Table.Cell>
        <Table.Cell className="h-name-cell">{ history.songName } by { history.artist}</Table.Cell>
        <Table.Cell className="h-date-cell">{ history.likedDate }</Table.Cell>
      </Table.Row>
    );
  }
}
