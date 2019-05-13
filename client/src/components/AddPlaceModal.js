import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { Modal, Typography, Input, Form } from 'antd';
import { hideModal, saveSelectedPlace } from '../actions';

const { TextArea } = Input;

class AddPlaceModal extends Component {
  formSubmit = async value => {
    const { selectedLocation, saveSelectedPlace, reset, hideModal } = this.props;
    const [ latitude, longitude ] = selectedLocation;
    const data = {
      ...value,
      latitude,
      longitude
    };
    await saveSelectedPlace(data);
    hideModal();
    reset();
  };

  renderInput({ input }) {
    return (
      <Form.Item label='Title'>
        <Input
          {...input}
          autoComplete='off'
          onFocus={event => event.target.select()}
        />
      </Form.Item>
    );
  };

  renderTextArea({ input }) {
    return (
      <Form.Item label='Description'>
        <TextArea
          {...input}
          rows={4}
          onFocus={event => event.target.select()}
        />
      </Form.Item>
    );
  }

  handleModalHide = () => {
    this.props.reset();
    this.props.hideModal();
  }

  render() {
    const { modalVisibility: { visible }, selectedLocation, handleSubmit } = this.props;
    return (
      <Modal
        title='Would you like to save this location?'
        visible={visible}
        onCancel={this.handleModalHide}
        onOk={handleSubmit(this.formSubmit)}
      >
        <Typography>
          {`Latitude & Longitude: ${selectedLocation[0]}, ${selectedLocation[1]}`}
        </Typography>
        <Form>
          <Field
            name='title'
            component={this.renderInput}
          />
          <Field
            name='description'
            component={this.renderTextArea}
          />
        </Form>
      </Modal>
    );
  }
}

const mapStateToProps = ({ modalVisibility }) => {
  return {
    modalVisibility
  };
};

export default compose(
  withRouter,
  reduxForm({ form: 'place', destroyOnUnmount: true }),
  connect(mapStateToProps, { hideModal, saveSelectedPlace })
)(AddPlaceModal);
