import api from './api';

const login = (formData) => {
  return ({
    type: 'LOGIN',
    payload: api.post('users/login', formData),
  });
};

export default login;
