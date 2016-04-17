import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { createOrg } from '../../actions';
import { Link } from 'react-router';

const fields = ['username', 'name', 'contactNumber', 'email', 'address1', 'address2', 'city', 'state', 'zip', 'country'];

class DonorProfile extends Component {
  onSubmit(props) {
    this.props.createOrg(props)
      .then(() => {
        this.context.router.push('/');
      })
  }

  render() {
    const { fields: { username, name, contactNumber, email, address1, address2, city, state, zip, country }, handleSubmit } = this.props;

    return (
      <section className="main">
        <div className="container">
          <h1 className="page-title">Register to donate</h1>
          <div className="columns is-desktop">
            <div className="column is-one-third is-offset-one-third">
              <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <p className="control">
                  <input className="input auth-input" placeholder="Company Name" type='text' {...username} />
                </p>

                <p className="control">
                  <input className="input auth-input" placeholder="Phone Number" type='text' {...contactNumber} />
                </p>

                <p className="control">
                  <input className="input auth-input" placeholder="Email" type='text' {...email} />
                </p>

                <p className="control">
                  <input className="input auth-input" type="text" placeholder="Address line 1" {...address1} />
                </p>

                <p className="control">
                  <input className="input auth-input" type="text" placeholder="Address line 2 (Apt, Ste #)" {...address2} />
                </p>

                <p className="control">
                  <input className="input auth-input" type="text" placeholder="City" {...city} />
                </p>

                <p className="control is-grouped">
                  <input className="input auth-input" type="text" placeholder="State" {...state} />
                  <input className="input auth-input" type="text" placeholder="Zip code" {...zip} />
                </p>

                <p className="control">
                  <input className="input auth-input" type="text" placeholder="Username" {...username} />
                </p>

                <p className="control">
                  <input className="input auth-input" type="password" placeholder="Password" {...username} />
                </p>

                <p className="control center-control">
                  <button type="submit" className="button button-submit">Sign Up</button>
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
}, null, { createOrg })(DonorProfile);
