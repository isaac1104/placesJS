import React, { Component } from 'react';
import { Modal, Typography } from 'antd';
import AddPlaceForm from './AddPlaceForm';

class AddPlaceModal extends Component {
  render() {
    return (
      <Modal
        title='Would you like to save this location?'
        visible={this.state.modalVisible}
        onCancel={() => this.setState({ modalVisible: false })}
      >
        <Typography>
          {/* {`Latitude & Longitude: ${selectedLocation[0]}, ${selectedLocation[1]}`} */}
        </Typography>
        <AddPlaceForm />
      </Modal>
    );
  }
}

export default AddPlaceModal;
