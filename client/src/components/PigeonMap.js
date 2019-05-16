import React, { Component } from 'react';
import { connect } from 'react-redux';
import Map from 'pigeon-maps';
import Marker from 'pigeon-marker';
import { showAddPlaceModal, navigateToSelectedPlace, fetchSavedPlace, showSelectedPlaceModal } from '../actions';
import AddPlaceModal from './AddPlaceModal';
import SelectedPlaceModal from './SelectedPlaceModal';

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
    const { savedPlaces : { data }, fetchSavedPlace, showSelectedPlaceModal } = this.props;
    return data.map(({ uuid, title, description, latitude, longitude }) => (
      <Marker
        key={uuid}
        anchor={[latitude, longitude]}
        onClick={() => {
          fetchSavedPlace(uuid);
          showSelectedPlaceModal();
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
    const { location: { latitude, longitude }, showAddPlaceModal } = this.props;
    return (
      <Map
        metaWheelZoom
        zoom={12}
        center={[latitude, longitude]}
        onClick={async ({ event, latLng, pixel }) => {
          await this.setState({ selectedLocation: latLng });
          showAddPlaceModal();
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

const mapStateToProps = ({ savedPlace, savedPlaces, location, modalVisibility }) => {
  return {
    savedPlace,
    savedPlaces,
    location,
    modalVisibility
  };
};

export default connect(mapStateToProps, { showAddPlaceModal, navigateToSelectedPlace, fetchSavedPlace, showSelectedPlaceModal })(PigeonMap);
