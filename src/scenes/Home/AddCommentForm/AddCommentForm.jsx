import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Row,
  Col,
  Button,
} from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { renderField } from '../../../utils/formUtils';
import './style.scss';

const CommentForm = (props) => {
  const { handleSubmit } = props;
  return (
    <Form>
      <Row className="formRow">
        <Col xs={10}>
          <Field
            name="body"
            component={renderField}
            type="text"
            label="Add a comment"
          />
        </Col>
        <Col xs={2} className="submit-btn">
          <Button color="primary" onClick={handleSubmit}>Add</Button>
        </Col>
      </Row>
    </Form>
  );
};

const AddCommentForm = reduxForm({
  // a unique name for the form
  form: 'addCommentForm',
})(CommentForm);

CommentForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default AddCommentForm;
