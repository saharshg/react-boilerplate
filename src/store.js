import { createStore, applyMiddleware, compose } from 'redux';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
// import persistState from 'redux-localstorage';

const createStoreWithMiddleware = compose(
  applyMiddleware(
    thunk,
    promise,
  ),
  // persistState('login'),
  window.REDUX_DEVTOOLS_EXTENSION ? window.devToolsExtension() : f => f,
)(createStore);

export default function configureStore() {
  const store = createStoreWithMiddleware(rootReducer);
  return store;
}
