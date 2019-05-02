import React, { Component } from 'react';
import '../User.scss'
import './History.scss';
import { Header, Icon, Menu, Table, Image } from 'semantic-ui-react';

export default class HistoryCompTable extends React.Component {
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
        <Table.Header>Comparisons</Table.Header>
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
        <Table.Cell className="album-cell"><Image className="img-album" size="tiny" src={ history.song1.songArt }></Image></Table.Cell>
        <Table.Cell className="name-cell">{ history.song1.songName } by { history.song1.artist} </Table.Cell>
                <Table.Cell className="album-cell"><Image className="img-album" size="tiny" src={ history.song2.songArt }></Image></Table.Cell>
        <Table.Cell className="name-cell">{ history.song2.songName } by { history.song2.artist} </Table.Cell>
      </Table.Row>
    );
  }
}
