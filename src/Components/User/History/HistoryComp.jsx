import React, { Component } from 'react';
import '../User.scss'
import './History.scss';
import { Table, Image } from 'semantic-ui-react';

export default class HistoryCompTable extends Component {
  render() {

    var rows = this.props.historyComps.map((chistory) => {

      return (
        <CompHistoryRow
          history = { chistory }
        />
      );
    });

    return (
      <Table basic='very'>
        <Table.Header className="h-header">Comparisons</Table.Header>
        <Table.Body>{ rows }</Table.Body>
      </Table>
    );
  }
}

class CompHistoryRow extends React.Component {

  render() {
    const history = this.props.history;
    return (
      <Table.Row>
        <Table.Cell className="h-album-cell"><Image className="img-album" size="tiny" src={ history.song1.songArt }></Image></Table.Cell>
        <Table.Cell className="h-firstsong-cell">{ history.song1.songName } by { history.song1.artist} </Table.Cell>
        <Table.Cell className="h-comp-cell">with</Table.Cell>
        <Table.Cell className="h-secondsong-cell">{ history.song2.songName } by { history.song2.artist} </Table.Cell>
        <Table.Cell className="h-album-cell"><Image className="img-album" size="tiny" src={ history.song2.songArt }></Image></Table.Cell>
        <Table.Cell className="h-date-cell"><b>Compared on:</b> { history.compareDate}</Table.Cell>
      </Table.Row>
    );
  }
}
