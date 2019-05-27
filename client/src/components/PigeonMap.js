import React, { Component } from 'react';
import { connect } from 'react-redux';
import Map from 'pigeon-maps';
import Marker from 'pigeon-marker';
import { toggleAddPlaceModal, navigateToSelectedPlace, fetchSavedPlace, toggleSelectedPlaceModal } from '../actions';
import AddPlaceModal from './AddPlaceModal';
import SelectedPlaceModal from './SelectedPlaceModal/SelectedPlaceModal';

class PigeonMap extends Component {
  state = {
    selectedLocation: []
  };

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(data => {
        this.props.navigateToSelectedPlace([data.coords.latitude, data.coords.longitude]);
      },
      () => { console.error('Could not retrieve current location. Please try again later.'); },
      { timeout: 10000 }
    );
    } else {
      console.error('Please allow geolocation on your browser to get your location.');
    }
  }

  renderMarkers() {
    const { savedPlaces : { data }, fetchSavedPlace, toggleSelectedPlaceModal } = this.props;
    return data.map(({ uuid, title, description, latitude, longitude }) => (
      <Marker
        key={uuid}
        anchor={[latitude, longitude]}
        onClick={() => {
          fetchSavedPlace(uuid);
          toggleSelectedPlaceModal();
        }}
        payload={1}
      />
    ));
  }

  renderAddPlaceModal(location) {
    const { addPlaceModalVisible } = this.props.modalVisibility;
    if (addPlaceModalVisible) {
      return <AddPlaceModal selectedLocation={location} />;
    }

    return null;
  }

  renderSelectedPlaceModal() {
    const { selectedPlaceModalVisible } = this.props.modalVisibility;
    if (selectedPlaceModalVisible) {
      return <SelectedPlaceModal />;
    }
  }

  renderMap() {
    const { location: { latitude, longitude }, toggleAddPlaceModal } = this.props;
    return (
      <Map
        metaWheelZoom
        zoom={12}
        center={[latitude, longitude]}
        onClick={async ({ event, latLng, pixel }) => {
          await this.setState({ selectedLocation: latLng });
          toggleAddPlaceModal();
        }}
      >
        {this.renderMarkers()}
      </Map>
    );
  }

  render() {
    const { selectedLocation } = this.state;
    return (
      <>
        {this.renderMap()}
        {this.renderAddPlaceModal(selectedLocation)}
        {this.renderSelectedPlaceModal()}
      </>
    );
  }
}

const mapStateToProps = ({ savedPlaces, location, modalVisibility }) => {
  return {
    savedPlaces,
    location,
    modalVisibility
  };
};

export default connect(mapStateToProps, { toggleAddPlaceModal, navigateToSelectedPlace, fetchSavedPlace, toggleSelectedPlaceModal })(PigeonMap);
