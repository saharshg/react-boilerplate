import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  // Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';

import App from './scenes/App/App';
import Signup from './scenes/Signup/Signup';
import Login from './scenes/Login/Login';
import interceptor from './utils/interceptor';
import ProfileContainer from './containers/ProfileContainer';

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
  interceptor();
  const { localStorage } = window;
  const userId = localStorage.getItem('loggedInUserId');
  return (
    <Route
      {...rest}
      render={props => (userId
        ? <Component {...props} /> : <Component {...props} />)
        // : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />)
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

  </>
);

export default () => (
  <Router>
    <Suspense fallback="Loading...">
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/signup/owner" component={Signup} />
        <Route exact path="/signup/buyer" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profile" component={ProfileContainer} />
        <PrivateRoute authed={requireAuth} path="/" component={renderRoutes} />
      </Switch>
    </Suspense>
  </Router>
);
