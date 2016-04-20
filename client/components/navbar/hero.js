import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { setRole } from '../../actions';

class HeroContainer extends Component {

  static propTypes = {
    setRole: PropTypes.func
  }

  render() {

  const { setRole } = this.props;

    return (
      <div>
        <section className="hero landing-hero">
          <div className="hero-content">
            <div className="container">
              <h1 className="title">Waste No More!</h1>

              <div className="columns is-mobile">
                <div className="expands column is-half is-offset-one-quarter">
                  <p className="subtitle">
                    Food waste is a massive global problem that has negative humanitarian, environmental and financial implications. According to the Natural Resources Defenses Council, reducing food waste by 20% would provide enough food to feed 25 million people.
                  </p>
                  <Link
                  className="column is-one-quarter is-offset-one-quarter
                  button button-direct"
                  to="/signup"
                  onClick={setRole.bind(null, 'user')}>Pick Up
                  </Link>
                  <Link
                  className="button is-one-quarter column button-direct"
                  to="/signup"
                  onClick={setRole.bind(null, 'donor')}>Donate
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="landing-content">
          <div className="container">
            <article>
              <h2 className="title">300 million tons wasted each year</h2>
              <h4 className="subtitle">300 million tons of food is...</h4>

              <div className="columns infographic is-multilined">
                <div className="column is-half">
                  <p className="content-text">
                    <span>Six&nbsp;billion&nbsp;pounds</span><br />
                    of fresh produce unharvested<br />or unsold each year
                  </p>
                </div>
                <div className="column is-half">
                  <p className="content-text">
                    Worth around <span>$1,000,000,000,000</span><br />
                    (1 trillion) US Dollars
                  </p>
                </div>
              </div>

              <div className="columns infographic is-multilined">
                <div className="column is-half is-offset-one-quarter">
                  <p className="content-text">
                    Sufficient to feed the estimated <span>900,000,000</span>
                    <br />people hungry in the world
                  </p>
                </div>
              </div>
            </article>

            <hr />

            <article className="landing-article">
              <h2 className="title">Our solution</h2>
              <div className="columns">
                <div className="column is-one-third">
                  <img src="img/grapes.jpg" className="content-img" />
                </div>

                <div className="column is-two-thirds">
                  <p className="content-text-paragraph">
                    According to a recent report by the United Nations,
                    about one-third of all food produced worldwide,
                    worth around US$1 trillion, gets lost or wasted in food
                    production and consumption systems. On the other end of
                    the spectrum, a report revealed that 48.1 million Americans
                    live in food-insecure households; of whom, 15.3 million of
                    them children. Waste Not aims to bridge this gap,
                    completely changing the way food surplus is handled.
                  </p>
                  <p className="content-text-paragraph">
                    Waste Not is a new technology platform that makes it
                    simple for retail outlets to inventory items that they
                    plan on throwing out and enables social and community
                    organizations to claim these items for redistribution.
                  </p>
                  <p className="content-text-paragraph">
                    Currently, Waste Not is only available to registered
                    social organizations, although we do have plans to
                    opening our platform to individuals in need.
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

export default connect(null, { setRole })(HeroContainer);
