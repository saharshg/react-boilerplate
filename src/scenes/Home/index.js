import React, { lazy } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
// const CommentsList = lazy(() => import('./CommentsList'));
const AddCommentForm = lazy(() => import('./AddCommentForm/AddCommentForm'));

class Home extends React.PureComponent {
  constructor(props) {
    super(props);
    const { comments } = this.props;
    this.state = {
      comments,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.comments !== nextProps.comments) {
      return { comments: nextProps.comments };
    }
    return null;
  }

  componentDidMount() {
    // const { getCommentsFunction } = this.props;
    // getCommentsFunction();
  }

  handleSubmit = () => {
    const { addCommentAction, commentFormValues } = this.props;
    addCommentAction(commentFormValues);
  }

  render() {
    // const { comments } = this.state;
    const { commentsLoading } = this.props;

    if (commentsLoading) {
      return (<>Loading...</>);
    }

    return (
      <Container>
        <AddCommentForm handleSubmit={this.handleSubmit} />
        {/* <CommentsList comments={comments} /> */}
      </Container>
    );
  }
}

Home.defaultProps = {
  comments: [{}],
};
Home.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  comments: PropTypes.array,
  getCommentsFunction: PropTypes.func.isRequired,
  commentsLoading: PropTypes.bool.isRequired,
};

export default Home;
