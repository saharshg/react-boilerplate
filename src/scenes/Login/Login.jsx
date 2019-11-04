import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Button,
  FormFeedback,
} from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { renderField } from '../../utils/formUtils';
import { required } from '../../utils/formUtils/validator';
import loginAction, { resetLogin } from '../../actions/login';
import './style.scss';

const LoginForm = (props) => {
  const {
    handleSubmit,
    submitting,
    login,
    loginForm: { username, password } = {},
    people: { data: { results = [] } = {}, error } = {},
    history,
    resetLoginAction,
  } = props;

  const [invalid, setInvalid] = useState('');

  const onFormSubmit = (values = {}) => login(values.username, values.password);
  useEffect(() => {
    if (results.length > 0) {
      const [loggedInUser] = results;
      if (username !== loggedInUser.name) {
        setInvalid('username');
        resetLoginAction();
      } else if (password !== loggedInUser.birth_year) {
        setInvalid('password');
        resetLoginAction();
      } else {
        localStorage.setItem('loggedInUser', loggedInUser.name);
        history.push('/search');
      }
    }
  }, [results]);

  if (error) {
    return 'Please try again!';
  }

  return (
    <Form onSubmit={handleSubmit(onFormSubmit)} className="container login-form">
      <h2 className="text-center">Login</h2>

      <Field
        name="username"
        component={renderField}
        type="text"
        placeholder="Username"
        validate={required}
        label="Username"
      />

      <Field
        name="password"
        component={renderField}
        type="password"
        placeholder="Birth year"
        validate={required}
        label="Password"
      />

      <Button color="primary" disabled={submitting} type="submit">
        Login
      </Button>

      <FormFeedback className="d-block">{invalid.length > 0 && `Invalid ${invalid}`}</FormFeedback>
    </Form>
  );
};

const LoginFormWrapper = reduxForm({
  form: 'loginForm',
})(LoginForm);

const mapStateToProps = (state) => {
  const { form: { loginForm: { values } = {} } = {}, login } = state;
  return ({
    loginForm: values,
    people: login,
  });
};

const mapDispatchToProps = dispatch => ({
  login: (name, pass) => dispatch(loginAction(name, pass)),
  resetLoginAction: () => dispatch(resetLogin),
});

const LoginFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginFormWrapper);

LoginForm.defaultProps = {
  handleSubmit: () => {},
  login: () => {},
  submitting: false,
  loginForm: {},
};

LoginForm.propTypes = {
  resetLoginAction: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
  login: PropTypes.func,
  submitting: PropTypes.bool,
  loginForm: PropTypes.shape({
    username: PropTypes.string,
    password: PropTypes.string,
  }),
  people: PropTypes.shape({
    isLoading: PropTypes.bool,
    error: PropTypes.bool,
    results: PropTypes.array,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default LoginFormContainer;
