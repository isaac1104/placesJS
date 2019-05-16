import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { Modal, Typography, Input, Form } from 'antd';
import uuidv4 from 'uuid/v4';
import { hideAddPlaceModal, saveSelectedPlace } from '../actions';

const { TextArea } = Input;

class AddPlaceModal extends Component {
  state = {
    formSubmitting: false
  };

  formSubmit = async value => {
    const { selectedLocation, saveSelectedPlace, reset, hideAddPlaceModal } = this.props;
    const [ latitude, longitude ] = selectedLocation;
    const data = {
      ...value,
      latitude,
      longitude,
      uuid: uuidv4()
    };
    this.setState({ formSubmitting: true });
    await saveSelectedPlace(data);
    await this.setState({ formSubmitting: false });
    hideAddPlaceModal();
    reset();
  };

  renderInput({ input, meta: { error, touched } }) {
    return (
      <Form.Item
        required
        label='Title'
        validateStatus={touched && error ? 'error' : ''}
        help={touched ? error : ''}
      >
        <Input
          {...input}
          allowClear
          autoComplete='off'
          onFocus={event => event.target.select()}
        />
      </Form.Item>
    );
  };

  renderTextArea({ input }) {
    return (
      <Form.Item label='Description (Optional)'>
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
    this.props.hideAddPlaceModal();
  }

  render() {
    const { modalVisibility: { addPlaceModalVisible }, selectedLocation, handleSubmit } = this.props;
    return (
      <Modal
        centered
        destroyOnClose
        title='Would you like to save this location?'
        okText='Save'
        visible={addPlaceModalVisible}
        onCancel={this.handleModalHide}
        confirmLoading={this.state.formSubmitting}
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

const validate = value => {
  const errors = {};
  if (!value.title) {
    errors.title = 'Title is required!';
  }
  return errors;
};

export default compose(
  withRouter,
  reduxForm({ validate, form: 'place', destroyOnUnmount: true }),
  connect(mapStateToProps, { hideAddPlaceModal, saveSelectedPlace })
)(AddPlaceModal);
