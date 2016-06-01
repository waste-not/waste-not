import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';
import { login } from '../../actions';

const fields = ['username', 'password'];

class Login extends Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    fields: PropTypes.object,
    handleSubmit: PropTypes.func,
    login: PropTypes.func,
    submitting: PropTypes.bool,
    error: PropTypes.string
  }

  render() {
    const {
      fields: {
        username,
        password
      },
      error,
      handleSubmit,
      submitting
    } = this.props;

    return (
      <section className="main">
        <div className="container">
          <h1 className="page-title">Sign In</h1>
          <div className="columns is-desktop">
            <div className="column is-one-third is-offset-one-third">
              <form onSubmit={handleSubmit(submit)}>


                <p className={`control ${username.touched &&
                    username.invalid ? 'is-danger' : ''}`}>
                  <input
                    className="input auth-input"
                    type="text"
                    placeholder="Username"
                    {...username} />
                    <span className="help is-danger">
                      {username.touched ? username.error : ''}
                    </span>
                </p>

                <p className="control">
                  <input
                    className="input auth-input"
                    type="password"
                    placeholder="Password"
                    {...password} />
                  <span className="help is-danger">
                    {password.touched ? password.error : ''}
                  </span>
                </p>
                  {error &&
                    <p className="control">
                      <span className="help is-danger">{error}</span>
                    </p>
                  }
                <p className="control center-control">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="button button-submit">
                    {submitting ? <i/> : <i/>}Sign In
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

const submit = (values, dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch(login(values, resolve, reject));
  });
};

function validate(values) {
  const errors = {};

  if (!values.username || values.username.trim() === '') {
    errors.username = 'Enter a username';
  }

  if (!values.password || values.password.trim() === '') {
    errors.password = 'Enter a password';
  }

  return errors;
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error
  };
}

export default reduxForm({
  form: 'Login',
  fields,
  validate
}, mapStateToProps, actions)(Login);
