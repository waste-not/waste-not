import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { setRole } from '../../actions';

class HeroContainer extends Component {
  render() {

  const { setRole } = this.props;

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
                    <Link className="column is-one-quarter is-offset-one-quarter button button-direct" to="/signup" onClick={setRole.bind(null, 'user')}>Pick Up</Link>
                    <Link className="button is-one-quarter column button-direct" to="/signup" onClick={setRole.bind(null, 'donor')}>Donate</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="landing-content">
          <div className="container">
            <article>
              <h2 className="title">300 million tons wasted</h2>
                <p className="content-text">
                  WILL MAKE PRETTY LATER
                  <br />
                  - This is the total net food production of Sub-Saharan Africa
                  - Worth around US $1 trillion
                  - Sufficient to feed the estimated 900 million people hungry in the world
                  - 6 billion pounds of fresh produce unharvested or unsold each year
                  - Food waste that goes to the landfill breaks down anaerobically and produces methane; methane is 21 times more potent than CO2 as a greenhouse gas
                </p>
            </article>
            <hr />
            <article>
              <h2 class="title">Our solution</h2>
              <div class="columns">
                <div class="column is-one-third">
                  cheesy stock photo
                </div>
                <div class="column is-two-thirds">
                  <p class="content-text">
                    According to a recent report by the United Nations, about one-third of all food produced worldwide, worth around US$1 trillion, gets lost or wasted in food production and consumption systems. On the other end of the spectrum, a report revealed that 48.1 million Americans live in food-insecure households; of whom, 15.3 million of them children. Waste Not aims to bridge this gap, completely changing the way food surplus is handled.
                  </p>
                  <p class="content-text">
                    Waste Not is a new technology platform that makes it simple for retail outlets to inventory items that they plan on throwing out and enables social and community organizations to claim these items for redistribution.
                  </p>
                  <p class="content-text">
                    Currently, Waste Not is only available to registered social organizations, although we do have plans to opening our platform to individuals in need.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </section>
      </div>
    );
  }
}

export default connect(null, { setRole })(HeroContainer)
