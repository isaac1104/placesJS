import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Typography, Spin, Icon, Button, message, Popconfirm } from 'antd';
import { deleteSelectedPlace, toggleSelectedPlaceModal } from '../../actions';
import classes from './SelectedPlaceModal.module.css';

class SelectedPlaceModal extends Component {
  state = {
    isDeleting: false
  };

  handleModalClose = () => {
    this.setState({ isDeleting: false });
    this.props.toggleSelectedPlaceModal();
  }

  renderSelectedPlaceModal() {
    const { isDeleting } = this.state;
    const {
      savedPlace: { data: { latitude, longitude, title, description, uuid }, isFetching },
      modalVisibility: { selectedPlaceModalVisible },
      deleteSelectedPlace,
      toggleSelectedPlaceModal
    } = this.props;

    return (
      <Modal
        centered
        destroyOnClose
        title={isFetching ? 'Fetching info...' : title}
        visible={selectedPlaceModalVisible}
        onOk={isFetching ? toggleSelectedPlaceModal : null}
        onCancel={toggleSelectedPlaceModal}
        footer={[
          <Popconfirm
            title='Are you sure you want to delete this place?'
            icon={<Icon type='exclamation' />}
            okType='danger'
            okText='Yes'
            cancelText='No'
            placement='bottom'
            trigger='click'
            onConfirm={() => {
              this.setState({ isDeleting: true });
              deleteSelectedPlace(uuid, this.handleModalClose, () => message.success('Place has been removed successfully'));
            }}
          >
            <Button
              disabled={isFetching ? true : false}
              loading={isDeleting ? true : false}
              key='delete'
              icon='delete'
              type='danger'
            >
              Delete
            </Button>
          </Popconfirm>,
          <Button
            disabled={isFetching ? true : false}
            key='ok'
            icon='check'
            type='primary'
            onClick={toggleSelectedPlaceModal}
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

export default connect(mapStateToProps, { deleteSelectedPlace, toggleSelectedPlaceModal })(SelectedPlaceModal);
