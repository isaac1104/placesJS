import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Typography } from 'antd';
import { hideSelectedPlaceModal } from '../actions';

class SelectedPlaceModal extends Component {
  render() {
    console.log(this.props.savedPlace);
    const { modalVisibility: { selectedPlaceModalVisible }, hideSelectedPlaceModal } = this.props;
    return (
      <Modal
        centered
        destroyOnClose
        title='Title'
        visible={selectedPlaceModalVisible}
        onOk={hideSelectedPlaceModal}
        onCancel={hideSelectedPlaceModal}
      >
        <Typography>
          latitude & longitude
        </Typography>
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
