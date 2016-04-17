import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import InventoryDonorItem from './inventory_donor_item';

const dummyq = [
  { title: 'Dummy', id: 123 },
  { title: 'Dummy2', id: 124 },
  { title: 'Dummy3', id: 125 }
];

class InventoryForm extends Component {
  componentWillMount() {
    this.props.fetchDonorInventory();
  }

  renderDonorInventory(inventoryData) {
    return inventoryData.map((inventory) => {
      return (
        <InventoryDonorItem key={inventory.id} {...inventory} />
      )
    })
  }

  render() {
    return (
      <section className="main">
        <div className="container">
          <h1 className="page-title">Posted donations</h1>
          <div className="columns is-multiline">
            <div className="column is-half">
              <button className="card is-fullwidth donor-add ">
                <h1><span>+</span><br />Add new donation</h1>
              </button>
            </div>
              {this.renderDonorInventory(dummyq)}
          </div>
        </div>
      </section>
    );
  }
}

function mapStateToProps({ inventory }) {
  return { inventory }
}

export default connect(mapStateToProps, actions)(InventoryForm);
