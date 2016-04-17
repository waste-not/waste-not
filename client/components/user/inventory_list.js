import React, { Component } from 'react';
import { connect } from 'react-redux';
// import GoogleMap from '../components/google_map';

class InventoryList extends Component {
  renderInventory(inventoryData) {
    const name = inventoryData.inventory.name;
    const temps = inventoryData.list.map(inventory => inventory.main.temp);
    const pressures = inventoryData.list.map(inventory => inventory.main.pressure);
    const humidities = inventoryData.list.map(inventory => inventory.main.humidity);
    const { lon, lat } = inventoryData.inventory.coord;

    return (
      <tr key={name}>
        <td><GoogleMap lon={lon} lat={lat} /></td>
      </tr>
    );
  }

  render() {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>City</th>
            <th>Tempurature (K)</th>
            <th>Pressure (hPA)</th>
            <th>Humidity (%)</th>
          </tr>
        </thead>
        <tbody>
          {this.props.inventory.map(this.renderInventory)}
        </tbody>
      </table>
    );
  }
}

function mapStateToProps({ inventory }) {
  return { inventory }
}

export default connect(mapStateToProps)(InventoryList);
