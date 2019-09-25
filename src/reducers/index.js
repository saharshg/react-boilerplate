import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import signup from './signup';
import login from './login';

const rootReducer = combineReducers({
  routing: routerReducer,
  signup,
  login,
  form: formReducer,
});

export default rootReducer;
