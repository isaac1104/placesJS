import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Typography, Spin, Icon, Button, message } from 'antd';
import { deleteSelectedPlace, hideSelectedPlaceModal } from '../../actions';
import classes from './SelectedPlaceModal.module.css';

class SelectedPlaceModal extends Component {
  state = {
    isDeleting: false
  };

  handleModalClose = () => {
    this.setState({ isDeleting: false });
    this.props.hideSelectedPlaceModal();
  }

  renderSelectedPlaceModal() {
    const { isDeleting } = this.state;
    const {
      savedPlace: { data: { latitude, longitude, title, description, uuid }, isFetching },
      modalVisibility: { selectedPlaceModalVisible },
      deleteSelectedPlace,
      hideSelectedPlaceModal
    } = this.props;

    return (
      <Modal
        centered
        destroyOnClose
        title={isFetching ? 'Fetching info...' : title}
        visible={selectedPlaceModalVisible}
        onOk={isFetching ? hideSelectedPlaceModal : null}
        onCancel={hideSelectedPlaceModal}
        footer={[
          <Button
            className={classes.DeleteButton}
            disabled={isFetching ? true : false}
            loading={isDeleting ? true : false}
            key='delete'
            icon='delete'
            type='danger'
            onClick={() => {
              this.setState({ isDeleting: true });
              deleteSelectedPlace(uuid, this.handleModalClose, () => message.success('Place has been removed successfully'));
            }}
          >
            Delete
          </Button>,
          <Button
            disabled={isFetching ? true : false}
            key='edit'
            icon='edit'
          >
            Edit
          </Button>,
          <Button
            disabled={isFetching ? true : false}
            key='ok'
            icon='check'
            type='primary'
            onClick={hideSelectedPlaceModal}
          >
            Ok
          </Button>,
        ]}
      >
        {isFetching ? (
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
        ) : (
          <>
            <Typography>{`Latitude & Longitude: ${latitude}, ${longitude}`}</Typography>
            <Typography>Description: {description || 'N/A'}</Typography>
          </>
        )}
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
