import React, { Component } from 'react';
import { connect } from 'react-redux';
import Map from 'pigeon-maps';
import Marker from 'pigeon-marker';
import { showModal, navigateToSelectedPlace } from '../actions';
import AddPlaceModal from './AddPlaceModal';

class PigeonMap extends Component {
  state = {
    selectedLocation: []
  };

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(data => {
        this.props.navigateToSelectedPlace([data.coords.latitude, data.coords.longitude]);
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
    return data.map(({ title, description, latitude, longitude }) => (
      <Marker
        key={title}
        anchor={[latitude, longitude]}
        onClick={() => console.log({ title, description, latitude, longitude })}
        payload={1}
      />
    ))
  }

  renderMap() {
    const { selectedLocation } = this.state;
    const { latitude, longitude } = this.props.location;
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

const mapStateToProps = ({ savedPlaces, location }) => {
  return {
    savedPlaces,
    location
  };
};

export default connect(mapStateToProps, { showModal, navigateToSelectedPlace })(PigeonMap);
