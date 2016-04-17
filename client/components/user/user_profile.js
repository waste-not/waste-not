import React, { Component } from 'react';
import InventoryList from './inventory_list';
import Map from '../map/map';

export default class OrganizationProfile extends Component {
  render() {
    return (
      <div>
        <InventoryList />
        <Map />
      </div>
    );
  }
}
