import api from './api';

const search = name => ({
  type: 'PLANETS',
  payload: api.get(`planets/?search=${name}`),
});

export default search;
