import { connect } from 'react-redux';

import Home from '../scenes/Home';
import getOrders from '../actions/actionGetOrders';

const mapStateToProps = state => ({
  shop: state.ordersData ? state.ordersData.shop : null,
});

const mapDispatchToProps = dispatch => ({
  getOrdersFunction: () => dispatch(getOrders()),
});

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);

export default HomeContainer;
