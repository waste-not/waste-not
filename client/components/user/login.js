import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { login } from '../../actions';
import { Link } from 'react-router';

const fields = ['username', 'password'];

class Login extends Component {
  onSubmit(props) {
    this.props.login(props)
      .then(() => {
        this.context.router.push('/');
      })
  }

  render() {
    const { fields: { username, password }, handleSubmit } = this.props;

    return (
      <section className="columns is-mobile">
        <section className="column is-half is-offset-one-quarter">
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>

            <section className={`${username.touched && username.invalid ? 'is-danger' : ''}`}>
              <label>Username</label>
              <p className="control">
                <input type='text' {...username} />
              </p>
            </section>

            <label>Password</label>
            <p className="control">
              <input type='password' {...password} />
            </p>

            <p className="control">
              <button type="submit">Submit</button>
            </p>

          </form>
        </section>
      </section>

    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.title) {
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
