import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { signoutUser } from '../../actions';

class Header extends Component {
  handleSignout() {
    // Grab action createStore
    signoutUser();
  }

  renderLinks() {
    if (this.props.authenticated) {
      // show a link to sign out
      return (
        <li className="header-item">
          <button
            className="button button-direct"
            onclick={this.handleSignout()}>
            Sign Out
          </button>
        </li>
      );
    // Will need condition for user on signup pages – show nothing
    } else {
      // show a link to sign in or sign up
      return [
        <li key={1}>
          <Link className="header-item" to="/login" className="header-item">
            Already Registered?
          </Link>
        </li>,
        <li key={2}>
          <span className="header-item">
            <Link className="button button-direct" to="/login">Log In</Link>
          </span>
        </li>
      ];
    }
  }


  render() {
    return (
      <header className="header landing-nav">
        <div className="container">
          <div className="header-left">
            <Link to="/" className="header-item">
              <img
                src="img/logo_single_light.png"
                alt="Waste Not"
                className="brand-logo" />
            </Link>
          </div>
          <div className="header-right header-menu">
            <ul>
              {this.renderLinks()}
            </ul>
          </div>
        </div>

      </header>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps, signoutUser)(Header);
