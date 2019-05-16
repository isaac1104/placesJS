import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Typography, Spin, Icon, Button, message } from 'antd';
import { deleteSelectedPlace, hideSelectedPlaceModal } from '../../actions';
import classes from './SelectedPlaceModal.module.css';

class SelectedPlaceModal extends Component {
  state = {
    isDeleting: false
  };

  renderSelectedPlaceModal() {
    const { isDeleting } = this.state;
    const {
      savedPlace: { data: { latitude, longitude, title, description, uuid }, isFetching },
      modalVisibility: { selectedPlaceModalVisible },
      deleteSelectedPlace,
      hideSelectedPlaceModal
    } = this.props;

    if (isFetching) {
      return (
        <Modal
          centered
          destroyOnClose
          title='Fetching Info...'
          visible={selectedPlaceModalVisible}
          onCancel={hideSelectedPlaceModal}
          footer={[
            <Button key='delete' type='danger' disabled>
              Delete
            </Button>,
            <Button key='ok' type='primary' disabled>
              Ok
            </Button>,
          ]}
        >
          <div className={classes.ModalSpinContainer}>
            <Spin
              indicator={
                <Icon
                  type='loading'
                  className={classes.ModalSpinner}
                />
              }
            />
          </div>
        </Modal>
      );
    }

    return (
      <Modal
        centered
        destroyOnClose
        title={title}
        visible={selectedPlaceModalVisible}
        onOk={hideSelectedPlaceModal}
        onCancel={hideSelectedPlaceModal}
        footer={[
          <Button
            loading={isDeleting ? true : false}
            key='delete'
            type='danger'
            onClick={async () => {
              this.setState({ isDeleting: true });
              await deleteSelectedPlace(uuid, () => message.success('Place has been removed successfully'), hideSelectedPlaceModal);
              this.setState({ isDeleting: false });
            }}
          >
            Delete
          </Button>,
          <Button key='ok' type='primary' onClick={hideSelectedPlaceModal}>
            Ok
          </Button>,
        ]}
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

export default connect(mapStateToProps, { deleteSelectedPlace, hideSelectedPlaceModal })(SelectedPlaceModal);
