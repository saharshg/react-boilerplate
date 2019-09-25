import api from './api';

const signup = (formData) => {
  return ({
    type: 'SIGNUP',
    payload: api.post('users/signup', formData),
  });
};

export default signup;
