import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import login from './login';
import search from './search';

const rootReducer = combineReducers({
  routing: routerReducer,
  login,
  search,
  form: formReducer,
});

export default rootReducer;
