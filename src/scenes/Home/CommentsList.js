import React from 'react';
import { Table } from 'reactstrap';
import PropTypes from 'prop-types';

const CommentsList = (props) => {
  const { comments } = props;

  return (
    <Table responsive hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Comment</th>
        </tr>
      </thead>
      <tbody>
        {comments.map(comment => (
          <tr key={comment.id}>
            <th scope="row">{comment.id}</th>
            <td>{comment.name}</td>
            <td>{comment.email}</td>
            <td>{comment.body}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

CommentsList.defaultProps = {
  comments: [],
};
CommentsList.propTypes = {
  comments: [PropTypes.object.isRequired],
};

export default CommentsList;
