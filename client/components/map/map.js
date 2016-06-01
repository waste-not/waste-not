import React, { PropTypes, Component } from 'react';
import {
  GoogleMapLoader,
  GoogleMap,
  InfoWindow,
  Marker
} from 'react-google-maps';

class InventoryMap extends Component {
  // static propTypes = {
  //   lat: PropTypes.number,
  //   lng: PropTypes.number
  // }

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
    <div className="map-container">
      <GoogleMapLoader
        className="map-area"
        containerElement={ <div style={{ height: '100%' }} /> }
        googleMapElement={
          <GoogleMap
            defaultZoom={12}
            defaultCenter={{
              lat: -34.397,
              lng: 150.644
            }} />
          }
          />
    </div>
    );
}
}

export default InventoryMap;
