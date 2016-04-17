import React, { Component } from 'react';

const { renderMap } = window;

export default class Map extends Component {
  render() {
    return (
      <div id='map' />
    );
  }

  componentDidMount() {
    renderMap();
  }
}
