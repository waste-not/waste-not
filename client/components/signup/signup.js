import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';
import { validateUserFields } from '../../actions/validate_user_fields';

const fields = [
  'username',
  'name',
  'contactNumber',
  'email',
  'address1',
  'address2',
  'city',
  'state',
  'zip',
  'country',
  'password'];

class DonorProfile extends Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    asyncValidating: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    createOrg: PropTypes.func,
    fields: PropTypes.object,
    handleSubmit: PropTypes.func,
    role: PropTypes.string
  }

  handleFormSubmit(props) {

    const { createOrg, role } = this.props;
    // Call action creator to sign up user with relevant role
    createOrg({ ...props, role: role });
  }

  render() {
    const {
      asyncValidating,
      fields: {
        username,
        name,
        contactNumber,
        email,
        address1,
        address2,
        city,
        state,
        zip,
        password
      },
      handleSubmit,
      role
    } = this.props;

    return (
      <section className="main">
        <div className="container">
          <h1 className="page-title">
            Register to {role === 'donor' ? 'Donate' : 'Pickup'}
          </h1>
          <div className="columns is-desktop">
            <div className="column is-one-third is-offset-one-third">
              <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <p className="control">
                  <input
                    className={`input auth-input ${name.touched
                      && name.invalid ? 'is-danger' : ''}`}
                    placeholder="Company Name"
                    type="text"
                    {...name} />
                  <span className="help is-danger">
                    {name.touched ? name.error : ''}
                  </span>
                </p>

                <p className="control">
                  <input
                    className={`input auth-input ${contactNumber.touched
                      && contactNumber.invalid ? 'is-danger' : ''}`}
                    placeholder="Phone Number"
                    type="number"
                    {...contactNumber} />
                  <span className="help is-danger">
                    {contactNumber.touched ? contactNumber.error : ''}
                  </span>
                </p>

                <p className="control">
                  <input
                    className={`input auth-input ${email.touched
                      && email.invalid ? 'is-danger' : ''}`}
                    placeholder="Email"
                    type="text"
                    {...email} />
                  <span className="help is-danger">
                    {email.touched ? email.error : ''}
                  </span>
                </p>

                <p className="control">
                  <input
                    className={`input auth-input ${address1.touched
                      && address1.invalid ? 'is-danger' : ''}`}
                    type="text"
                    placeholder="Address line 1"
                    {...address1} />
                  <span className="help is-danger">
                    {address1.touched ? address1.error : ''}
                  </span>
                </p>

                <p className="control">
                  <input
                    className="input auth-input"
                    type="text"
                    placeholder="Address line 2 (Apt, Ste #)"
                    {...address2} />
                </p>

                <p className="control">
                  <input
                    className={`input auth-input ${city.touched
                      && city.invalid ? 'is-danger' : ''}`}
                    type="text"
                    placeholder="City"
                    {...city} />
                  <span className="help is-danger">
                    {city.touched ? city.error : ''}
                  </span>
                </p>

                <p className="control is-grouped">
                  <input
                    className={`input auth-input ${state.touched
                      && state.invalid ? 'is-danger' : ''}`}
                    type="text"
                    placeholder="State"
                    {...state} />
                  <span className="help is-grouped is-danger">
                    {state.touched ? state.error : ''}
                  </span>
                  <input
                    className={`input auth-input ${zip.touched
                      && zip.invalid ? 'is-danger' : ''}`}
                    type="number"
                    placeholder="Zip code"
                    {...zip} />
                  <span className="help is-grouped is-danger">
                    {zip.touched ? zip.error : ''}
                  </span>
                </p>

                <p className="control">
                  <input
                    className={`input auth-input ${username.touched
                      && username.invalid ? 'is-danger' : ''}`}
                    type="text"
                    placeholder="Username"
                    {...username} />
                  {asyncValidating === 'username'}
                  <span className="help is-danger">
                    {username.touched ? username.error : ''}
                  </span>
                </p>

                <p className="control">
                  <input
                    className={`input auth-input ${password.touched
                      && password.invalid ? 'is-danger' : ''}`}
                    type="password"
                    placeholder="Password"
                    {...password} />
                  <span className="help is-danger">
                    {password.touched ? password.error : ''}
                  </span>
                </p>

                <p className="control center-control">
                  <button
                    type="submit"
                    className="button button-submit">Sign Up
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

// reduxForm: 1 is form config,
// 2nd is mapStateToProps,
// 3rd is mapDispatchToProps
// function asyncValidate(values) {
//
// }

const asyncValidate = (values, dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch(validateUserFields(values, resolve, reject));
  });
};

function validate(values) {
  const errors = {};

  if (!values.name || values.name.trim() === '') {
    errors.name = 'Enter a company name';
  }

  if (!values.contactNumber || values.contactNumber.trim() === '') {
    errors.contactNumber = 'Enter a phone number';
  }

  if (!values.email || values.email.trim() === '') {
    errors.email = 'Enter an email';
  }

  if (!values.address1 || values.address1.trim() === '') {
    errors.address1 = 'Enter an address';
  }

  if (!values.city || values.city.trim() === '') {
    errors.city = 'Enter a city';
  }

  if (!values.state || values.state.trim() === '') {
    errors.state = 'Required';
  }

  if (!values.zip || values.zip.trim() === '') {
    errors.zip = 'Required';
  }

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
    errorMessage: state.auth.error,
    validateFields: state.validateFields
  };
}

export default reduxForm({
  form: 'DonorProfileForm',
  fields,
  asyncValidate,
  asyncBlurFields: [ 'username' ],
  // callback function for client-side validation
  validate
}, mapStateToProps, actions)(DonorProfile);
