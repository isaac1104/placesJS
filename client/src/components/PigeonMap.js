import React, { Component } from 'react';
import Map from 'pigeon-maps';
import Marker from 'pigeon-marker';
import AddPlaceModal from './AddPlaceModal';

class PigeonMap extends Component {
  state = {
    longitude: '',
    latitude: '',
    selectedLocation: [],
    modalVisible: false
  };

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(data => {
        this.setState({ longitude: data.coords.longitude, latitude: data.coords.latitude });
      },
      () => { throw new Error('Could not retrieve current location. Please try again later.') },
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
        onClick={({ event, latLng, pixel }) => this.setState({ modalVisible: true, selectedLocation: latLng })}
      >
        <Marker
          anchor={[latitude, longitude]}
          payload={1}
          onClick={({ event, anchor, pixel }) => console.log(anchor)}
        />
        <AddPlaceModal />
      </Map>
    );
  }
}

export default PigeonMap;
