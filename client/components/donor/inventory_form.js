import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createInventory } from '../../actions';

const fields = [
  'title',
  'deadlineDate',
  'description',
  'perishable',
  'address',
  'city',
  'category',
  'note'
];

class InventoryForm extends Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    createInventory: PropTypes.func,
    fields: PropTypes.object,
    handleSubmit: PropTypes.func
  }

  onSubmit(props) {
    this.props.createInventory(props);
  }

  render() {
    const {
      fields: {
        title,
        deadlineDate,
        description,
        perishable,
        address,
        city,
        category,
        note
      },
      handleSubmit
    } = this.props;

    // Form validation will check if user has inputed data
    return (
      <section className="main">
        <div className="container">
          <h1 className="page-title">Add A DropOff</h1>
          <div className="columns is-desktop">
            <div className="column is-one-third is-offset-one-third">
              <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <p className="control">
                  <input
                    className={`input auth-input ${title.touched
                      && title.invalid ? 'is-danger' : ''}`}
                    placeholder="DropOff Title"
                    type="text"
                    {...title} />
                  <span className="help is-danger">
                    {title.touched ? title.error : ''}
                  </span>
                </p>

                <p className="control">
                  <label>Deadline Pickup Date: </label>
                  <input
                    className={`input auth-input ${deadlineDate.touched
                      && deadlineDate.invalid ? 'is-danger' : ''}`}
                    type="date"
                    {...deadlineDate} />
                  <span className="help is-danger">
                    {deadlineDate.touched ? deadlineDate.error : ''}
                  </span>
                </p>

                <p className="control">
                  <input
                    className={`input auth-input ${description.touched
                      && description.invalid ? 'is-danger' : ''}`}
                    placeholder="Full Inventory Description"
                    type="text"
                    {...description} />
                  <span className="help is-danger">
                    {description.touched ? description.error : ''}
                  </span>
                </p>

                <p className="control">
                  <label>Perishable? &nbsp;&nbsp;</label>
                  <input
                    className="auth-input"
                    type="checkbox"
                    {...perishable} />
                </p>

                <p className="control">
                  <input
                    className={`input auth-input ${address.touched
                      && address.invalid ? 'is-danger' : ''}`}
                    placeholder="Address"
                    type="text"
                    {...address} />
                  <span className="help is-danger">
                    {address.touched ? address.error : ''}
                  </span>
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

                <p className="control">
                  <label>Category: &nbsp;&nbsp;</label>
                  <select className={`auth-input ${category.touched
                      && category.invalid ? 'is-danger' : ''}`}
                    {...category}
                    value={category.value || ''}>
                    <option value=""></option>
                    <option value="Food">Food</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Women">Women</option>
                    <option value="Children">Children</option>
                    <option value="Other">Other</option>
                  </select>
                  <span className="help is-danger">
                    {category.touched ? category.error : ''}
                  </span>
                </p>

                <p className="control">
                  <input
                    className="input auth-input"
                    placeholder="Additional Information?"
                    type="text"
                    {...note} />
                </p>

                <p className="control center-control">
                  <button
                    type="submit"
                    className="button button-submit">Submit
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

function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = 'Enter a title';
  }

  if (!values.deadlineDate) {
    errors.deadlineDate = 'Enter a deadline date';
  }

  if (!values.description) {
    errors.description = 'Enter a description';
  }

  if (!values.address) {
    errors.address = 'Enter an address';
  }

  if (!values.city || values.city.trim() === '') {
    errors.city = 'Enter a city';
  }

  if (!values.category || '') {
    errors.category = 'Pick a category';
  }

  return errors;
}

// reduxForm: 1 is form config
// 2nd is mapStateToProps
// 3rd is mapDispatchToProps

export default reduxForm({
  form: 'InventoryForm',
  fields,
  validate
}, null, { createInventory })(InventoryForm);
