import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import InventoryDonorItem from './inventory_donor_item';
import { Link } from 'react-router';

const dummyq = [
  { title: 'Dummy', _id: 123 },
  { title: 'Dummy2', _id: 124 },
  { title: 'Dummy3', _id: 125 }
];

class InventoryForm extends Component {
  componentWillMount() {
    this.props.fetchDonorInventory();
  }

  renderDonorInventory(inventoryData) {
    return inventoryData.map((inventory) => {
      return (
        <InventoryDonorItem key={inventory._id} {...inventory} />
      )
    })
  }

  render() {
    return (
      <section className="main">
        <div className="container">
          { this.props.children }
          <h1 className="page-title">Posted donations</h1>
          <div className="columns is-multiline">
            <div className="column is-half">
              <Link to='/donor/newdonation'>
                <button className="card is-fullwidth donor-add ">
                  <h1><span>+</span><br />Add new donation</h1>
                </button>
            </Link>
            </div>
              {this.renderDonorInventory(this.props.inventory)}
          </div>
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return { inventory: state.inventory }
}

export default connect(mapStateToProps, actions)(InventoryForm);
