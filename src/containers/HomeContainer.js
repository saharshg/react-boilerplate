import { connect } from 'react-redux';

import Home from '../scenes/Home';
import getComments from '../actions/actionGetComments';

const mapStateToProps = state => ({
  comments: state.comments.data || [],
  commentsLoading: state.isLoading,
});

const mapDispatchToProps = dispatch => ({
  getCommentsFunction: () => dispatch(getComments()),
});

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);

export default HomeContainer;
