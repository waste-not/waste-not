import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import InventoryItem from './inventory_item';

const dummy = [
  { title: 'Dummy', id: 123 },
  { title: 'Dummy2', id: 124 },
  { title: 'Dummy3', id: 125 }
];

class InventoryList extends Component {
  componentWillMount() {
    this.props.fetchInventory();
  }

  renderInventory(inventoryData) {
    return inventoryData.map((inventory) => {
      return (
        <InventoryItem />
      )
    })
  }

  render() {
    return (
      <div>
        <ul className="list-group">
          {this.renderInventory(dummy)}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ inventory }) {
  return { inventory }
}

export default connect(mapStateToProps, actions)(InventoryList);
