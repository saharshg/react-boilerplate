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
} from '../../../utils/formUtils/validator';
import signupAction from '../../../actions/signup';
import '../style.scss';

const BuyerForm = (props) => {
  const {
    handleSubmit,
    pristine,
    reset,
    submitting,
    signup,
  } = props;

  const onFormSubmit = (values = {}) => {
    const { name, email, password } = values;
    let formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('type', 'buyer');
    signup(formData);
  };

  return (
    <Form onSubmit={handleSubmit(onFormSubmit)}>
      <h2 className="text-center">Buyer Signup</h2>
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
          <Button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</Button>
          <Button color="primary" disabled={submitting} type="submit">Signup</Button>
        </Col>
      </Row>
    </Form>
  );
};

const BuyerFormWrapper = reduxForm({
  // a unique name for the form
  form: 'buyerForm',
})(BuyerForm);

const mapStateToProps = (state) => {
  const { form: { buyerForm: { values } = {} } = {} } = state;
  return ({
    buyerForm: values,
  });
};

const mapDispatchToProps = (dispatch) => ({
  signup: (payload) => dispatch(() => signupAction(payload)),
});

const BuyerFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BuyerFormWrapper);

BuyerForm.defaultProps = {
  handleSubmit: () => {},
  error: false,
  pristine: false,
  reset: () => {},
  submitting: false,
};

BuyerForm.propTypes = {
  handleSubmit: PropTypes.func,
  error: PropTypes.bool,
  pristine: PropTypes.bool,
  reset: PropTypes.func,
  submitting: PropTypes.bool,
};

export default BuyerFormContainer;
