import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import ordersReducer from './getOrdersReducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  orders: ordersReducer,
});

export default rootReducer;
