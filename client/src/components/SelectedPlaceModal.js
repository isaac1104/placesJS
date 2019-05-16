import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Typography, Spin, Icon } from 'antd';
import { hideSelectedPlaceModal } from '../actions';

class SelectedPlaceModal extends Component {
  renderSelectedPlaceModal() {
    const {
      savedPlace: { data: { latitude, longitude, title, description }, isFetching },
      modalVisibility: { selectedPlaceModalVisible },
      hideSelectedPlaceModal
    } = this.props;

    if (isFetching) {
      return (
        <Modal
          centered
          destroyOnClose
          title={title || ''}
          visible={selectedPlaceModalVisible}
          okButtonProps={{ disabled: true }}
          cancelButtonProps={{ disabled: true }}
        >
          <Spin indicator={<Icon type='loading' />} />
        </Modal>
      );
    }

    return (
      <Modal
        centered
        destroyOnClose
        title={title || ''}
        visible={selectedPlaceModalVisible}
        onOk={hideSelectedPlaceModal}
        onCancel={hideSelectedPlaceModal}
      >
        <Typography>{`Latitude & Longitude: ${latitude}, ${longitude}`}</Typography>
        <Typography>Description: {description || 'N/A'}</Typography>
      </Modal>
    );
  }

  render() {
    return (
      <>
        {this.renderSelectedPlaceModal()}
      </>
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
