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

import { renderField } from '../../utils/formUtils';
import {
  required,
  email,
  password,
} from '../../utils/formUtils/validator';
import loginAction from '../../actions/login';
import './style.scss';

const LoginForm = (props) => {
  const {
    handleSubmit,
    pristine,
    reset,
    submitting,
    login,
  } = props;

  const onFormSubmit = (values = {}) => {
    const { email, password } = values;
    let formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    login(formData);
  };

  return (
    <Form onSubmit={handleSubmit(onFormSubmit)}>
      <h2 className="text-center">Login</h2>
      <Row className="formRow">
        <Col>
          <Field
            name="email"
            component={renderField}
            type="email"
            validate={[required, email]}
            label="Email"
          />
        </Col>

        <Col>
          <Field
            name="password"
            component={renderField}
            type="password"
            validate={[required, password]}
            label="Password"
          />
        </Col>
      </Row>

      <Row className="formRow">
        <Col>
          <Button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</Button>
          <Button color="primary" disabled={submitting} type="submit">Login</Button>
        </Col>
      </Row>
    </Form>
  );
};

const LoginFormWrapper = reduxForm({
  // a unique name for the form
  form: 'loginForm',
})(LoginForm);

const mapStateToProps = (state) => {
  const { form: { loginForm: { values } = {} } = {} } = state;
  return ({
    loginForm: values,
  });
};

const mapDispatchToProps = (dispatch) => ({
  login: (payload) => dispatch(() => loginAction(payload)),
});

const LoginFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginFormWrapper);

LoginForm.defaultProps = {
  handleSubmit: () => {},
  error: false,
  pristine: false,
  reset: () => {},
  submitting: false,
};

LoginForm.propTypes = {
  handleSubmit: PropTypes.func,
  error: PropTypes.bool,
  pristine: PropTypes.bool,
  reset: PropTypes.func,
  submitting: PropTypes.bool,
};

export default LoginFormContainer;
