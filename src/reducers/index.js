import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import commentsReducer from './getCommentsReducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  comments: commentsReducer,
});

export default rootReducer;
