import { connect } from 'react-redux';

import Home from '../scenes/Home';
import getComments from '../actions/actionGetComments';

const mapStateToProps = (state: { comments: { data: [] }, isLoading: boolean }) => ({
  comments: state.comments.data || [],
  commentsLoading: state.isLoading,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getCommentsFunction: () => dispatch(getComments()),
});

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);

export default HomeContainer;
