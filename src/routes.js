import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';

import Login from './scenes/Login/Login';
import Search from './scenes/Search/Search';
// import interceptor from './utils/interceptor';

const loggedIn = () => {
  const { localStorage } = window;
  const userId = localStorage.getItem('loggedInUserId');
  if (JSON.parse(userId) !== null
    || JSON.parse(userId) !== undefined) {
    return true;
  }
  return false;
};


const requireAuth = () => {
  if (!loggedIn()) {
    return true;
  }
  return false;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
// interceptor();
  const { localStorage } = window;
  const username = localStorage.getItem('loggedInUser');
  return (
    <Route
      {...rest}
      render={props => (username
        ? <Component {...props} /> // : <Component {...props} />)
        : <Redirect to={{ pathname: '/', state: { from: props.location } }} />)
      }
    />
  );
};

PrivateRoute.defaultProps = {
  location: window.location,
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  location: PropTypes.object,
  authed: PropTypes.func.isRequired,
};

const renderRoutes = () => (
  <>
    <Route exact path="/search" component={Search} />
  </>
);

export default () => (
  <Router>
    <Suspense fallback="Loading...">
      <Switch>
        <Route exact path="/" component={Login} />
        <PrivateRoute authed={requireAuth} component={renderRoutes} />
      </Switch>
    </Suspense>
  </Router>
);
