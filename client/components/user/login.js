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
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <label>Username</label>
        <input type='text' {...username} />
        <label>Password</label>
        <input type='password' {...password} />
        <button type="submit">Submit</button>
      </form>
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
