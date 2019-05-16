import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Typography } from 'antd';
import { hideSelectedPlaceModal } from '../actions';

class SelectedPlaceModal extends Component {
  render() {
    const {
      savedPlace: { data: { latitude, longitude, title, description} },
      modalVisibility: { selectedPlaceModalVisible },
      hideSelectedPlaceModal
    } = this.props;
    return (
      <Modal
        centered
        destroyOnClose
        title={title}
        visible={selectedPlaceModalVisible}
        onOk={hideSelectedPlaceModal}
        onCancel={hideSelectedPlaceModal}
      >
        <Typography>{`Latitude & Longitude: ${latitude}, ${longitude}`}</Typography>
        <Typography>Description: {description || 'N/A'}</Typography>
      </Modal>
    );
  }
}

const mapStateToProps = ({ modalVisibility, savedPlace }) => {
  return {
    modalVisibility,
    savedPlace
  };
};

export default connect(mapStateToProps, { hideSelectedPlaceModal })(SelectedPlaceModal);
