import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

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

  // static contextTypes = {
  //   router: PropTypes.object
  // }
  //
  // static propTypes = {
  //   createOrg: PropTypes.func,
  //   fields: PropTypes.object,
  //   handleSubmit: PropTypes.func,
  //   role: PropTypes.string
  // }

  handleFormSubmit(props) {

    const { createOrg, role } = this.props;
    // Call action creator to sign up user with relevant role
    createOrg({ ...props, role: role });
      // .then((data) => {
      //   this.context.router.push(`/${role}`);
      //   window.localStorage.setItem('token', data.token);
      // });
  }

  render() {
    const {
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
                    className="input auth-input"
                    placeholder="Company Name"
                    type="text"
                    {...name} />
                </p>

                <p className="control">
                  <input
                    className="input auth-input"
                    placeholder="Phone Number"
                    type="text"
                    {...contactNumber} />
                </p>

                <p className="control">
                  <input
                    className="input auth-input"
                    placeholder="Email"
                    type="text"
                    {...email} />
                </p>

                <p className="control">
                  <input
                    className="input auth-input"
                    type="text"
                    placeholder="Address line 1"
                    {...address1} />
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
                    className="input auth-input"
                    type="text"
                    placeholder="City"
                    {...city} />
                </p>

                <p className="control is-grouped">
                  <input
                    className="input auth-input"
                    type="text"
                    placeholder="State"
                    {...state} />
                  <input
                    className="input auth-input"
                    type="text"
                    placeholder="Zip code"
                    {...zip} />
                </p>

                <p className="control">
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

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error
  };
}

export default reduxForm({
  form: 'DonorProfileForm',
  fields
}, mapStateToProps, actions)(DonorProfile);
