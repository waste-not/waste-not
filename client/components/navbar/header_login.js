import React, { Component } from 'react';
import { Link } from 'react-router';

export default class HeaderItem extends Component {
  render() {
    return (
      <div className="header-right header-menu">
        <Link to="/login" className="header-item">Already Registered?</Link>
        <span className="header-item">
          <Link className="button button-direct" to="/login">Log in</Link>
        </span>
      </div>
    );
  }
}
