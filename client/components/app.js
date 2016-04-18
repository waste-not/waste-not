import React, { Component, PropTypes } from 'react';

import Header from './navbar/header';

export default class App extends Component {

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ])
  }

  render() {

    const { children } = this.props;

    return (
      <div>
        <Header />
        {children}
      </div>
    );
  }
}
