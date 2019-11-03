import api from './api';

const login = name => ({
  type: 'LOGIN',
  payload: api.get(`people/?search=${name}`),
});

export const resetLogin = () => ({
  type: 'RESET_LOGIN',
});

export default login;
