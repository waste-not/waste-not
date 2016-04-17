import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Header extends Component {
  render() {
    return (
      <nav>
        <ul>
          <Link to='/retail'>Brand Logo</Link>
          <Link to='/login'>Login/Signup</Link>
        </ul>
      </nav>
    );
  }
}
