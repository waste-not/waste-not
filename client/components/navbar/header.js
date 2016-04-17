import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Header extends Component {
  render() {
    return (
      <header className="header landing-nav">
        <div className="container">
          <div className="header-left">
            <Link className="header-item" to="/">
              <img src="img/logo_single_light.png" alt="Waste Not" className="brand-logo" />
            </Link>
          </div>

          <div className="header-right header-menu">
            <Link to="/login" className="header-item">Already Registered?</Link>
            <span className="header-item">
              <Link className="button button-direct" to="/login">Log in</Link>
            </span>
          </div>
        </div>
      </header>
    );
  }
}
