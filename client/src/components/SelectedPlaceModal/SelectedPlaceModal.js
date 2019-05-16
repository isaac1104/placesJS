import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Typography, Spin, Icon, Button, Popconfirm, message } from 'antd';
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

    return (
      <Modal
        centered
        destroyOnClose
        title={isFetching ? 'Fetching info...' : title}
        visible={selectedPlaceModalVisible}
        onOk={isFetching ? hideSelectedPlaceModal : null}
        onCancel={hideSelectedPlaceModal}
        footer={[
          <Popconfirm
            title='Are you sure you want to delete this place?'
            icon={<Icon type='exclamation' />}
            okType='danger'
            okText='Yes'
            cancelText='No'
            placement='bottom'
            trigger='click'
            onConfirm={async () => {
              this.setState({ isDeleting: true });
              await deleteSelectedPlace(uuid, () => message.success('Place has been removed successfully'), hideSelectedPlaceModal);
              this.setState({ isDeleting: false });
            }}
          >
            <Button
              disabled={isFetching ? true : false}
              loading={isDeleting ? true : false}
              key='delete'
              type='danger'
            >
              Delete
            </Button>
          </Popconfirm>,
          <Button
            disabled={isFetching ? true : false}
            key='ok'
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
