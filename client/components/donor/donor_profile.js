import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import InventoryDonorItem from './inventory_donor_item';
import { Link } from 'react-router';

class InventoryForm extends Component {

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]),
    fetchDonorInventory: PropTypes.func,
    inventory: PropTypes.array
  }

  componentWillMount() {
    this.props.fetchDonorInventory();
  }

  renderDonorInventory(inventoryData) {
    return inventoryData.map((inventory) => {
      return (
        <InventoryDonorItem key={inventory._id} {...inventory} />
      );
    });
  }

  render() {

    const { children, inventory } = this.props;

    return (
      <section className="main">
        <div className="container">
          {children}
          <h1 className="page-title">Posted donations</h1>
          <div className="columns is-multiline">
            <div className="column is-half">
              <Link to="/donor/newdonation">
                <button className="card is-fullwidth donor-add ">
                  <h1><span>+</span><br />Add new donation</h1>
                </button>
            </Link>
            </div>
              {this.renderDonorInventory(inventory)}
          </div>
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return { inventory: state.inventory };
}

export default connect(mapStateToProps, actions)(InventoryForm);
