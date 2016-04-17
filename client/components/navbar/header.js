import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Header extends Component {
  render() {
    return (
      // <nav>
      //   <ul>
      //     <Link to='/'>Brand Logo</Link>
      //     <Link to='/retail'>Donors</Link>
      //     <Link to='/login'>Login/Signup</Link>
      //     <Link to='/user'>Profile</Link>
      //   </ul>
      // </nav>
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
