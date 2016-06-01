import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import {
  GoogleMapLoader,
  GoogleMap,
  InfoWindow,
  Marker
} from 'react-google-maps';

class InventoryMap extends Component {

  static propTypes = {
    fetchActiveInventory: PropTypes.func,
    fetchClaimedInventory: PropTypes.func,
    inventory: PropTypes.object,
    claimInventory: PropTypes.func,
    unclaimInventory: PropTypes.func,
    userId: PropTypes.string,
    lat: PropTypes.number,
    lng: PropTypes.number
  }

  componentWillMount() {
    this.props.fetchActiveInventory();
    this.props.fetchClaimedInventory();
  }

  // renderMap(inventoryData) {
  //   return inventoryData.map(inventory => {
  //     return (
  //       inventory.coordinates
  //     );
  //   });
  // }
  // Temporary values of lat and lng need to be changed to fit dynamic markers
render() {
  return (
    <section className="map-container">
      <GoogleMapLoader
        containerElement={
          <div
            style={{
              height: '500px',
              width: '75%',
              margin: 'auto'
            }}
          />
        }
        googleMapElement={
          <GoogleMap
            ref={(map => console.log(map))}
            defaultZoom={3}
            defaultCenter={{
              lat: -34.397,
              lng: 150.644
            }} />
          }
          />
      </section>
    );
  }
}

function mapStateToProps({ inventory, auth }) {
  return { inventory, userId: auth._id };
}

export default connect(mapStateToProps, actions)(InventoryMap);
