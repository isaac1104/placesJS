import React, { Component } from 'react';
import { connect } from 'react-redux';
import Map from 'pigeon-maps';
import Marker from 'pigeon-marker';
import { showModal } from '../actions';
import AddPlaceModal from './AddPlaceModal';

class PigeonMap extends Component {
  state = {
    longitude: '',
    latitude: '',
    selectedLocation: []
  };

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(data => {
        this.setState({ longitude: data.coords.longitude, latitude: data.coords.latitude });
      },
      () => { console.log('Could not retrieve current location. Please try again later.'); },
      { timeout: 10000 }
    );
    } else {
      console.log('Please allow geolocation on your browser to get your location.');
    }
  }

  render() {
    const { latitude, longitude, selectedLocation } = this.state;
    return (
      <Map
        metaWheelZoom
        center={[latitude, longitude]}
        zoom={12}
        onClick={async ({ event, latLng, pixel }) => {
          await this.setState({ selectedLocation: latLng });
          this.props.showModal();
        }}
      >
        <Marker
          anchor={[latitude, longitude]}
          payload={1}
          onClick={({ event, anchor, pixel }) => console.log(anchor)}
        />
        <AddPlaceModal selectedLocation={selectedLocation} />
      </Map>
    );
  }
}

export default connect(null, { showModal })(PigeonMap);
