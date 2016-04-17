import React, { Component } from 'react';
import { Link } from 'react-router';

export default class HeroContainer extends Component {
  render() {
    return (
      <div>
        <section className="hero landing-hero">
          <div className="hero-content">
            <div className="container">
              <h1 className="title">Waste No More!</h1>

              <div className="columns is-mobile">
                <div className="column is-half is-offset-one-quarter">
                  <p className="subtitle">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <div className="columns is-mobile">
                    <Link className="column is-one-quarter is-offset-one-quarter button button-direct" to="/newuser">Pick Up</Link>
                    <Link className="button is-one-quarter column button-direct" to="/donors">Donate</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="landing-content">
          <div className="container">
            <p>Blah</p>
          </div>
        </section>
      </div>
    );
  }
}
