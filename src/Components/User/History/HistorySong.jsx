import React, { Component } from 'react';
import '../User.scss'
import './History.scss';
import { Header, Icon, Menu, Table, Image } from 'semantic-ui-react';

export default class HistorySongTable extends React.Component {
  render() {

    var rows = this.props.historySongs.map((shistory) => {

      return (
        <SongHistoryRow
          history = { shistory }
        />
      );
    });

    return (
      <Table basic='very'>
        <Table.Header>Songs</Table.Header>
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
        <Table.Cell className="album-cell"><Image className="img-album" size="tiny" src={ history.songArt }></Image></Table.Cell>
        <Table.Cell className="name-cell">{ history.songName } by { history.artist}</Table.Cell>
      </Table.Row>
    );
  }
}
