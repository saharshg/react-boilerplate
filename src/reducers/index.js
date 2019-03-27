import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import getCommentsReducer from './getCommentsReducer';
import addCommentReducer from './addCommentReducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  comments: getCommentsReducer,
  addComment: addCommentReducer,
  form: formReducer,
});

export default rootReducer;
