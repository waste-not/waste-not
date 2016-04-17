import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { login } from '../../actions';
import { Link } from 'react-router';

const fields = ['username', 'password'];

class Login extends Component {

  static contextTypes = {
    router: React.PropTypes.object
  }

  onSubmit(props) {
    this.props.login(props)
      .then(({ role }) => {
        this.context.router.push(`/${role}`);
      })
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


                <p className={`control ${username.touched && username.invalid ? 'is-danger' : ''}`}>
                  <input className="input auth-input" type='text' placeholder="Username" {...username} />
                </p>


                <p className="control">
                  <input className="input auth-input" type='password' placeholder="Password" {...password} />
                </p>

                <p className="control center-control">
                  <button type="submit" className="button button-submit">Sign In</button>
                </p>

              </form>
            </div>
          </div>
        </div>
      </section>

    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.username) {
    errors.title = 'Enter a title';
  }
  if (!values.categories) {
    errors.categories = 'Enter categories';
  }
  if (!values.content) {
    errors.content = 'Enter some content';
  }

  return errors;
}

export default reduxForm({
  form: 'Login',
  fields
}, null, { login })(Login);
