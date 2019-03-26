import api from './api';

const getComments = () => ({
  type: 'GET_COMMENTS',
  payload: api.get('/comments'),
});

export default getComments;
