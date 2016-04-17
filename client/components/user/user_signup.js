import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { createUser } from '../../actions';
import { Link } from 'react-router';

const fields = ['username', 'name', 'contactNumber', 'email', 'address1', 'address2', 'city', 'state', 'zip', 'country'];

class UserSignup extends Component {
  onSubmit(props) {
    this.props.createUser(props)
      .then(() => {
        this.context.router.push('/');
      })
  }

  render() {
    const { fields: { username, name, contactNumber, email, address1, address2, city, state, zip, country }, handleSubmit } = this.props;

    return (
      <section className="columns is-mobile">
        <section className="column is-half is-offset-one-quarter">
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <h3>Register to Donate</h3>
            <label className="label">Username</label>
            <p className="control">
              <input className="input" type='text' {...username} />
            </p>

            <label className="label">Company Name</label>
            <p className="control">
              <input className="input" type='text' {...name} />
            </p>

            <label className="label">Phone Number</label>
            <p className="control">
              <input className="input" type='text' {...contactNumber} />
            </p>

            <label className="label">Email</label>
            <p className="control">
              <input className="input" type='text' {...email} />
            </p>

            <label className="label">Address Line 1</label>
            <p className="control">
              <input className="input" type='text' {...address1} />
            </p>
            <label className="label">Address Line 2</label>
            <p>
              <input className="input" type='text' {...address2} />
            </p>

            <label className="label">City</label>
            <p className="control">
              <input className="input" type='text' {...city} />
            </p>

            <label className="label">State</label>
            <p className="control">
              <input className="input" type='text' {...state} />
            </p>

            <label className="label">Zip</label>
            <p>
              <input className="input" type='text' {...zip} />
            </p>

            <label className="label">Country</label>
            <p>
              <input className="input" type='text' {...country} />
            </p>

            <p class="control">
              <button type="submit" className="button is-primary">Submit</button>
              <button className="button is-link">Cancel</button>
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

// reduxForm: 1 is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps

// export default reduxForm({
//   form: 'UserSignupForm',
//   fields
// }, null, null)(UserSignup);

export default reduxForm({
  form: 'UserSignupForm',
  fields
}, null, { createUser })(UserSignup);
