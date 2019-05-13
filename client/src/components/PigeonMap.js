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

  renderMarkers() {
    const { data } = this.props.savedPlaces;
    return data.map(({ title, latitude, longitude }) => (
      <Marker
        key={title}
        anchor={[latitude, longitude]}
        payload={1}
        onClick={({ event, anchor, pixel }) => console.log(anchor)}
      />
    ))
  }

  renderMap() {
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
        {this.renderMarkers()}
        <AddPlaceModal selectedLocation={selectedLocation} />
      </Map>
    );
  }

  render() {
    return (
      <>
        {this.renderMap()}
      </>
    );
  }
}

const mapStateToProps = ({ savedPlaces }) => {
  return {
    savedPlaces
  };
};

export default connect(mapStateToProps, { showModal })(PigeonMap);
