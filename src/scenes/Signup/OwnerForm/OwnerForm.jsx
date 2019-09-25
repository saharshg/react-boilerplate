import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Row,
  Col,
  Button,
} from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { renderField } from '../../../utils/formUtils';
import {
  required,
  email,
  password,
  confirmPassword,
  exact5,
} from '../../../utils/formUtils/validator';
import './style.scss';

const OwnerForm = (props) => {
  const {
    error,
    handleSubmit,
    pristine,
    reset,
    submitting,
  } = props;

  console.log(props);
  const onFormSubmit = (values) => {
    console.log('values', values);
  };

  return (
    <Form onSubmit={handleSubmit(onFormSubmit)}>
      <h2 className="text-center">Owner Signup</h2>
      <Row className="formRow">
        <Col>
          <Field
            name="name"
            component={renderField}
            type="text"
            validate={[required]}
            label="Name"
          />
        </Col>
        <Col>
          <Field
            name="email"
            component={renderField}
            type="email"
            validate={[required, email]}
            label="Email"
          />
        </Col>
      </Row>
      <Row className="formRow">
        <Col>
          <Field
            name="password"
            component={renderField}
            type="password"
            validate={[required, password]}
            label="Password"
          />
        </Col>
        <Col>
          <Field
            name="confirmPassword"
            component={renderField}
            type="password"
            validate={[required, password, confirmPassword]}
            label="Confirm Password"
          />
        </Col>
      </Row>
      <Row className="formRow">
        <Col>
          <Field
            name="restaurantName"
            component={renderField}
            type="text"
            label="Restaurant Name"
          />
        </Col>
        <Col>
          <Field
            name="restaurantZipcode"
            component={renderField}
            type="text"
            validate={[exact5]}
            label="Restaurant Zipcode"
          />
        </Col>
      </Row>
      <Row className="formRow">
        <Col>
          <Field
            name="cuisine"
            component={renderField}
            type="text"
            label="Cuisine"
          />
        </Col>
      </Row>
      {error && <strong>{error}</strong>}
      <Row className="formRow">
        <Col>
          <Button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</Button>
          <Button color="primary" disabled={submitting} type="submit">Signup</Button>
        </Col>
      </Row>
    </Form>
  );
};

const OwnerFormWrapper = reduxForm({
  // a unique name for the form
  form: 'ownerForm',
})(OwnerForm);

const mapStateToProps = (state) => {
  console.log('state', state);
  const { form: { ownerForm: { values } = {} } = {} } = state;
  return ({
    ownerForm: values,
  });
};

const mapDispatchToProps = () => ({

});

const OwnerFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OwnerFormWrapper);

OwnerForm.defaultProps = {
  handleSubmit: () => {},
  error: false,
  pristine: false,
  reset: () => {},
  submitting: false,
};

OwnerForm.propTypes = {
  handleSubmit: PropTypes.func,
  error: PropTypes.bool,
  pristine: PropTypes.bool,
  reset: PropTypes.func,
  submitting: PropTypes.bool,
};

export default OwnerFormContainer;
