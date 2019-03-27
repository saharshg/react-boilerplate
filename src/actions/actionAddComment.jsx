import api from './api';

const addComment = (params) => {
  const url = `/addComment?body=${params.body}`;

  return ({
    type: 'ADD_COMMENT',
    payload: api.post(url),
  });
};

export default addComment;
