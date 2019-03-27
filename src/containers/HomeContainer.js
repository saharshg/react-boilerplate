import { connect } from 'react-redux';

import Home from '../scenes/Home';
import getComments from '../actions/actionGetComments';
import addComment from '../actions/actionAddComment';

const mapStateToProps = state => ({
  commentFormValues: (state.form.addCommentForm && state.form.addCommentForm.values) || {},
  comments: state.comments.data || [],
  commentsLoading: state.isLoading || false,
});

const mapDispatchToProps = dispatch => ({
  getCommentsFunction: () => dispatch(getComments()),
  addCommentAction: params => dispatch(addComment(params)),
});

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);

export default HomeContainer;
