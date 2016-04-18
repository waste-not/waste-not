import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { login } from '../../actions';

const fields = ['username', 'password'];

class Login extends Component {

  static propTypes = {
    fields: PropTypes.object,
    handleSubmit: PropTypes.func,
    login: PropTypes.func
  }

  onSubmit(props) {
    this.props.login(props)
      .then(() => {
        this.context.router.push('/');
      });
  }

  render() {
    const { fields: { username, password }, handleSubmit } = this.props;

    return (
      <section className="main">
        <div className="container">
          <h1 className="page-title">Sign In</h1>
          <div className="columns is-desktop">
            <div className="column is-one-third is-offset-one-third">
              <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>

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

export default reduxForm({
  form: 'Login',
  fields
}, null, { login })(Login);
