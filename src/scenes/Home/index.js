import React from 'react';
import PropTypes from 'prop-types';
import CommentsList from './CommentsList';

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
    const { getCommentsFunction } = this.props;
    getCommentsFunction();
  }

  render() {
    const { comments } = this.state;
    const { commentsLoading } = this.props;

    if (commentsLoading) {
      return (<>Loading...</>);
    }

    return (<CommentsList comments={comments} />);
  }
}

Home.defaultProps = {
  comments: [{}],
};
Home.propTypes = {
  comments: PropTypes.array,
  getCommentsFunction: PropTypes.func.isRequired,
  commentsLoading: PropTypes.bool.isRequired,
};

export default Home;
