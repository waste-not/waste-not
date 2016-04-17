import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import InventoryItem from './inventory_item';

const dummy = [
  { title: 'Dummy', id: 123 },
  { title: 'Dummy2', id: 124 }
];

class InventoryList extends Component {
  componentWillMount() {
    this.props.fetchInventory();
    this.props.fetchClaimedInventory();
  }

  renderInventory(inventoryData) {
    return inventoryData.map((inventory) => {
      return (
        <InventoryItem key={inventory._id} {...inventory} />
      )
    })
  }


  render() {
    return (
      <section className="main">
        <div className="container">
          <h1 className="page-title">Recent claims</h1>
          <div className="columns is-multiline">

            {this.renderInventory(dummy)}

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


            <div className="column is-half">
              <article className="card is-fullwidth inv-item inv-active">
                <header className="card-header is-fullwidth">
                  <h3 className="card-header-title">
                    claim meeee
                  </h3>
                </header>
                <div className="card-content">
                  <div className="content">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
                  </div>
                </div>
                <footer className="card-footer">
                  <a className="card-footer-item">Contact donor</a>
                  <a className="card-footer-item">Claim</a>
                </footer>
              </article>
            </div>


          </div>





        </div>
      </section>
    );
  }
}

function mapStateToProps({ inventory }) {
  return { inventory }
}

export default connect(mapStateToProps, actions)(InventoryList);
