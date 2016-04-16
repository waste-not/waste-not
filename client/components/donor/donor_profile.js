import React, { Component } from 'react';
import { reduxForm } from 'redux-form'

class DonorProfile extends Component {

  onSubmit(props) {

  }

  render() {
    const { fields: { name, address1, address2, city, state, zip, country }, handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Donor</h3>
        <label>Name</label>
        <input type='text' {...name} />
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
      </form>
    );
  }
}

// reduxForm: 1 is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps

export default reduxForm({
  form: 'DonorProfileForm',
  fields
}, null, null)()
