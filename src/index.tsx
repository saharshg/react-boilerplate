import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import * as serviceWorker from './serviceWorker';
import configureStore from './store';

const HomeContainer = lazy(() => import('./containers/HomeContainer'));

const store = configureStore();

ReactDOM.render((
  <Provider store={store}>
    <Router>
      <Suspense fallback={'Loading...'}>
        <Switch>
          <Route exact path="/" component={HomeContainer} />
        </Switch>
      </Suspense>
    </Router>
  </Provider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
