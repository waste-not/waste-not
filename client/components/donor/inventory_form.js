import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { createInventory } from '../../actions';

const fields = ['title', 'deadlineDate', 'description', 'perishable', 'address', 'category', 'note'];

class InventoryForm extends Component {

  static contextTypes = {
    router: React.PropTypes.object
  }

  onSubmit(props) {
    this.props.createInventory(props)
      .then((data) => {
        this.context.router.push(`/donor`);
      })
  }

  render() {
    const { fields: { title, deadlineDate, description, perishable, address, category, note }, handleSubmit } = this.props;

    return (
      <section className="main">
        <div className="container">
          <h1 className="page-title">Add A DropOff</h1>
          <div className="columns is-desktop">
            <div className="column is-one-third is-offset-one-third">
              <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <p className="control">
                  <input className='input auth-input' placeholder="DropOff Title" type='text' {...title} />
                </p>

                <p className="control">
                  <label>Deadline Pickup Date: </label>
                  <input className='input auth-input' type="date" {...deadlineDate} />
                </p>

                <p className="control">
                  <input className='input auth-input' placeholder="Full Inventory Description" type='text' {...description} />
                </p>

                <p className="control">
                  <label>Perishable? &nbsp;&nbsp;</label>
                  <input className='auth-input' type='checkbox' {...perishable} />
                </p>

                <p className="control">
                  <input className='input auth-input' placeholder="Address" type='text' {...address} />
                </p>

                <p className="control">
                  <label>Category: &nbsp;&nbsp;</label>
                  <select className='auth-input' {...category} value={category.value || ''}>
                    <option value=''></option>
                    <option value='Food'>Food</option>
                    <option value='Clothing'>Clothing</option>
                    <option value='Women'>Women</option>
                    <option value='Children'>Children</option>
                    <option value='Other'>Other</option>
                  </select>
                </p>

                <p className="control">
                  <input className='input auth-input' placeholder="Additional Information?" type='text' {...note} />
                </p>

                <p className="control center-control">
                  <button type="submit" className="button button-submit">Submit</button>
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
  form: 'InventoryForm',
  fields
}, null, { createInventory })(InventoryForm);
