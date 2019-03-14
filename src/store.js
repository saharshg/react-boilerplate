import { createStore, applyMiddleware, compose } from 'redux';
import { createPromise } from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import persistState from 'redux-localstorage';
import rootReducer from './reducers';

const promise = createPromise({
  types: {
    fulfilled: 'success',
    pending: 'loading',
    rejected: 'error',
  },
});

const createStoreWithMiddleware = compose(
  applyMiddleware(
    thunk,
    promise,
  ),
  persistState('auth'),
  window.REDUX_DEVTOOLS_EXTENSION ? window.devToolsExtension() : f => f,
)(createStore);

export default function configureStore() {
  const store = createStoreWithMiddleware(rootReducer);
  return store;
}
