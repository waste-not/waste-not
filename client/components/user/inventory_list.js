import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import InventoryItem from './inventory_item';
import InventoryMap from '../map/map';

class InventoryList extends Component {

  static propTypes = {
    fetchActiveInventory: PropTypes.func,
    fetchClaimedInventory: PropTypes.func,
    inventory: PropTypes.object,
    claimInventory: PropTypes.func,
    unclaimInventory: PropTypes.func,
    userId: PropTypes.string,
    lat: PropTypes.number,
    lng: PropTypes.number,
    showMap: PropTypes.bool,
    toggleMap: PropTypes.func,
    toggleMapOff: PropTypes.func
  }

  componentWillMount() {
    this.props.fetchActiveInventory();
    this.props.fetchClaimedInventory();
  }

  renderInventory(inventoryData, showMap) {
    if (!showMap) {
      return inventoryData.map(inventory => {
        return (
          <InventoryItem
            item={inventory}
            key={inventory._id}
            claimInventory={this.props.claimInventory
              .bind(null, inventory, this.props.userId)}
              unclaimInventory={this.props.unclaimInventory
                .bind(null, inventory)} />
            );
          });
    }
  }

  renderMap(showMap) {
    if (showMap) {
      return (
        <InventoryMap />
      );
    }
  }

  switchMapView() {
    const { toggleMap } = this.props;
    toggleMap();
  }

  switchListView() {
    const { toggleMapOff } = this.props;
    toggleMapOff();
  }


  render() {

    const {
      claimedInventory,
      activeInventory,
      showMap
    } = this.props.inventory;

    return (
      <section className="main">
        <div className="container">
          <h1 className="page-title">Recent claims</h1>
          <div className="columns is-multiline">

            {this.renderInventory(claimedInventory)}

          </div>

          <hr />

          <h1 className="page-title">Active donations</h1>

          <nav className="control has-addons user-nav">
            <a
              className="button"
              onClick={this.switchListView.bind(this)}>
              List view
            </a>
            <a
              className="button is-active"
              onClick={this.switchMapView.bind(this)}>
              Map view
            </a>
          </nav>

          <div id="list-view" className="columns is-multiline">

            {this.renderInventory(activeInventory, showMap)}

          </div>
          <div>
            {this.renderMap(showMap)}
          </div>

        </div>
      </section>
    );
  }
}

function mapStateToProps({ inventory, auth }) {
  return { inventory, userId: auth._id };
}

export default connect(mapStateToProps, actions)(InventoryList);
