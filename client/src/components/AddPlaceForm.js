import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { Input, Form } from 'antd';

const { TextArea } = Input;

class SearchForm extends Component {
  formSubmit = value => {
    console.log(value);
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

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.formSubmit)}>
        <Field
          name='title'
          component={this.renderInput}
        />
        <Field
          name='description'
          component={this.renderTextArea}
        />
      </form>
    );
  }
};

export default compose(withRouter, reduxForm({ form: 'place' }))(SearchForm);
