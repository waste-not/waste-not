import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { createUser } from '../../actions';
import { Link } from 'react-router';

const fields = ['username', 'name', 'contactNumber', 'email', 'address1', 'address2', 'city', 'state', 'zip', 'country'];

class DonorProfile extends Component {
  onSubmit(props) {
    this.props.createUser(props)
      .then(() => {
        this.context.router.push('/');
      })
  }

  render() {
    const { fields: { username, name, contactNumber, email, address1, address2, city, state, zip, country }, handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Register to Donate</h3>
        <label>Username</label>
        <input type='text' {...username} />
        <label>Company Name</label>
        <input type='text' {...name} />
        <label>Phone Number</label>
        <input type='text' {...contactNumber} />
        <label>Email</label>
        <input type='text' {...email} />
        <label>Address Line 1</label>
        <input type='text' {...address1} />
        <label>Address Line 2</label>
        <input type='text' {...address2} />
        <label>City</label>
        <input type='text' {...city} />
        <label>State</label>
        <input type='text' {...state} />
        <label>Zip</label>
        <input type='text' {...zip} />
        <label>Country</label>
        <input type='text' {...country} />
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

// reduxForm: 1 is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps

// export default reduxForm({
//   form: 'DonorProfileForm',
//   fields
// }, null, null)(DonorProfile);

export default reduxForm({
  form: 'DonorProfileForm',
  fields
}, null, { createUser })(DonorProfile);
