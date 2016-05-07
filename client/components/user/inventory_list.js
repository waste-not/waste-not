import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import InventoryItem from './inventory_item';

class InventoryList extends Component {

  static propTypes = {
    fetchActiveInventory: PropTypes.func,
    fetchClaimedInventory: PropTypes.func,
    inventory: PropTypes.object,
    claimInventory: PropTypes.func,
    unclaimInventory: PropTypes.func
  }

  componentWillMount() {
    this.props.fetchActiveInventory();
    this.props.fetchClaimedInventory();
  }

  renderInventory(inventoryData) {
    return inventoryData.map(inventory => {
      return (
        <InventoryItem
          item={inventory}
          key={inventory._id}
          claimInventory={this.props.claimInventory}
          unclaimInventory={this.props.unclaimInventory} />
      );
    });
  }


  render() {

    const { inventory } = this.props;

    return (
      <section className="main">
        <div className="container">
          <h1 className="page-title">Recent claims</h1>
          <div className="columns is-multiline">

            {this.renderInventory(inventory.claimedInventory)}

          </div>

          <hr />

          <h1 className="page-title">Active donations</h1>

          <nav className="control has-addons user-nav">
            <a className="button user-nav-active">
              List view
            </a>
            <a className="button">
              Map view
            </a>
          </nav>

          <div id="list-view" className="columns is-multiline">

            {this.renderInventory(inventory.activeInventory)}

          </div>
        </div>
      </section>
    );
  }
}

function mapStateToProps({ inventory }) {
  return { inventory };
}

export default connect(mapStateToProps, actions)(InventoryList);
