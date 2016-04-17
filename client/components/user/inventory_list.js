import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

const dummy = [
  { title: 'Dummy', id: 123 },
  { title: 'Dummy2', id: 124 },
  { title: 'Dummy3', id: 125 }
];

class InventoryList extends Component {
  componentWillMount() {
    this.props.fetchInventory();
  }

  // renderInventory(inventoryData) {
  //   return inventoryData.map((inventory) => {
  //     <h3 className="inventory-name">{inventory.title}</h3>
  //   });
  //   // const title = inventoryData.map(inventory => inventory.title);
  //   // const company = inventoryData.map(inventory => inventory.title);
  //   // const { lon, lat } = inventoryData.inventory.coord;
  //
  //   return (
  //     <div className="inventory-list">
  //         {items}
  //     </div>
  //   );
  // }

  renderInventory(inventoryData) {
    return inventoryData.map((inventory) => {
      return (
        <li key={inventory.id}>
          <strong>{inventory.title}</strong>
        </li>
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

// function mapStateToProps(state) {
//   return { users: state.users };
// }
//
// export default connect(mapStateToProps, actions)(InventoryList);

function mapStateToProps({ inventory }) {
  return { inventory }
}

export default connect(mapStateToProps, actions)(InventoryList);
