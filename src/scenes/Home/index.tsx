import React from 'react';
// import PropTypes from 'prop-types';
import CommentsList from './CommentsList';

interface Comment {
  id: number,
  name: string,
  email: string,
  body: string
}

interface HomeProps {
  comments: Comment[],
  getCommentsFunction: Function,
  commentsLoading: boolean,
}

interface HomeState {
  comments: Comment[],
}

class Home extends React.PureComponent<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);
    this.state = {
      comments: this.props.comments,
    };
  }

  static getDerivedStateFromProps(nextProps: HomeProps, prevState: HomeState) {
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
      return <>Loading...</>;
    }

    return (<CommentsList comments={comments} />);
  }
}

// Home.defaultProps = {
//   comments: [{}],
// };
// Home.propTypes = {
//   comments: PropTypes.array,
//   getCommentsFunction: PropTypes.func.isRequired,
//   commentsLoading: PropTypes.bool.isRequired,
// };

export default Home;
