import React, { Component } from 'react';
import Map from 'pigeon-maps';
import Marker from 'pigeon-marker';
import { Modal, Typography } from 'antd';
import AddPlaceForm from './AddPlaceForm';

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
        <Modal
          title='Would you like to save this location?'
          visible={this.state.modalVisible}
          onCancel={() => this.setState({ modalVisible: false })}
        >
          <Typography>
            {`Latitude & Longitude: ${selectedLocation[0]}, ${selectedLocation[1]}`}
          </Typography>
          <AddPlaceForm />
        </Modal>
      </Map>
    );
  }
}

export default PigeonMap;
