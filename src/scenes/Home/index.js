import React from 'react';

class Home extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      comments: this.props.comments
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(nextProps);
    if(prevState.comments !== nextProps.comments) {
      return { comments: nextProps.comments }
    }
    return null
  }

  componentDidMount() {
    this.props.getCommentsFunction();
  }

  render() {
    const { commentsLoading } = this.props;
    if(commentsLoading) {
      return <>Loading...</>
    }
    return (
      <>Home Component</>
    );
  }
}

export default Home;
