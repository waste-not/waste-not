import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

const fields = ['username', 'password'];

class Login extends Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    fields: PropTypes.object,
    handleSubmit: PropTypes.func,
    login: PropTypes.func
  }

  handleFormSubmit(formProps) {
    // const { username, password } = this.props;
    // Need to figure out what to pass into action
    this.props.login(formProps);
  }

  render() {
    const { fields: { username, password }, handleSubmit } = this.props;

    return (
      <section className="main">
        <div className="container">
          <h1 className="page-title">Sign In</h1>
          <div className="columns is-desktop">
            <div className="column is-one-third is-offset-one-third">
              <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>


                <p className={`control ${username.touched &&
                    username.invalid ? 'is-danger' : ''}`}>
                  <input
                    className="input auth-input"
                    type="text"
                    placeholder="Username"
                    {...username} />
                </p>

                <p className="control">
                  <input
                    className="input auth-input"
                    type="password"
                    placeholder="Password"
                    {...password} />
                </p>

                <p className="control center-control">
                  <button
                    type="submit"
                    className="button button-submit">Sign In
                  </button>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error
  };
}

export default reduxForm({
  form: 'Login',
  fields
}, mapStateToProps, actions)(Login);
