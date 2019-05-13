import React, { Component } from 'react';
import Map from 'pigeon-maps';
import Marker from 'pigeon-marker';

class PigeonMap extends Component {
  state = {
    longitude: '',
    latitude: ''
  };

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(data => {
        this.setState({ longitude: data.coords.longitude, latitude: data.coords.latitude });
      });
    } else {
      throw new Error('Please allow geolocation on your browser to get your location.');
    }
  }

  render() {
    const { latitude, longitude } = this.state;
    return (
      <Map
        metaWheelZoom
        center={[latitude, longitude]}
        zoom={12}
        onClick={({ event, latLng, pixel }) => console.log(latLng)}
      >
        <Marker
          anchor={[latitude, longitude]}
          payload={1}
          onClick={({ event, anchor, pixel }) => console.log(anchor)}
        />
      </Map>
    );
  }
}

export default PigeonMap;
