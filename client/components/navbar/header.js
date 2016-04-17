import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Header extends Component {
  render() {
    return (
      <nav>
        <ul>
          <Link to='/'>Brand Logo</Link>
          <Link to='/retail'>Donors</Link>
          <Link to='/login'>Login/Signup</Link>
          <Link to='/user'>Profile</Link>
        </ul>
      </nav>
    );
  }
}
