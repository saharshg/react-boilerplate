import React from 'react';
import {
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Form,
} from 'reactstrap';
import PropTypes from 'prop-types';
// import { Field } from 'redux-form';
import './style.scss';
import ImagePanel from './ImagePanel';
// import { renderField } from '../../utils/formUtils';

const Profile = (props) => {
  const {
    reset,
    updateProfile,
    formData,
    isCharacterLoading,
    errors,
    profileImage = 'https://cdn-images-1.medium.com/max/1200/0*p-oMwgaJv7tPUZO1.',
    name,
    email,
    phoneNumber,
    // restaurantName,
    restaurantImage,
    // cuisine,
  } = props;

  // const [editHeadline, setEditHeadline] = useState(false);
  // const [editDescription, setEditDescription] = useState(false);
  // const [editVideoChatRate, setEditVideoChatRate] = useState(false);

  // const toggle = (key) => {
  //   switch (key) {
  //     case 'editHeadline': {
  //       setEditHeadline(!editHeadline);
  //       break;
  //     }
  //     case 'editDescription': {
  //       setEditDescription(!editDescription);
  //       break;
  //     }
  //     case 'editVideoChatRate': {
  //       setEditVideoChatRate(!editVideoChatRate);
  //       break;
  //     }
  //     default: break;
  //   }
  // };

  // const save = (key, e) => {
  //   // updateProfile(payload);
  //   // toggle(key);
  // };

  // const cancel = (key) => {
  //   reset();
  //   toggle(key);
  // };

  const renderHeadline = () => {
    return (
      <Row>
        <Col xs={10}>
          {name}
        </Col>
      </Row>
    );
  };

  const renderDescription = () => {
    return (
      <Row>
        <Col xs={10}>{email}</Col>
      </Row>
    );
  };

  const renderVideoChatRate = () => {
    return (
      <Row>
        <Col xs={10}>
          {`${phoneNumber} Credits`}
        </Col>
      </Row>
    );
  };

  return (
    <Form>
      <Card className="profile">
        <CardHeader className="customCardHeader">
          <h2>
            <span className="headTitle">Profile Settings</span>
          </h2>

          <div className="headerBorderBottom" />
        </CardHeader>

        <CardBody className="pt-0">
          <Row>
            <Col>
              <ImagePanel
                restaurantImage={restaurantImage}
                profileImage={profileImage}
                updateProfile={updateProfile}
                name={name}
                reset={reset}
                error={errors.updateChar}
                formData={formData}
                isCharacterLoading={isCharacterLoading}
              />
            </Col>
          </Row>
          <Row className="row_detail">
            <Col xs={7}>
              <Row className="setting_details">
                <Col xs={12} className="fs-20">Display name</Col>

                <Col className="help_text">Name as it appears to the users</Col>
              </Row>
            </Col>

            <Col className="setting_description fs-20 user-name">{name}</Col>
          </Row>

          <div className="borderBottom" />

          <Row className="row_detail">
            <Col xs={7}>
              <Row className="setting_details">
                <Col xs={12} className="fs-20">Headline</Col>

                <Col className="help_text">Single line, no more than 60 characters</Col>
              </Row>
            </Col>

            <Col xs={5} className="setting_description">
              {renderHeadline()}
            </Col>
          </Row>

          <div className="borderBottom" />

          <Row className="row_detail">
            <Col xs={7}>
              <Row className="setting_details">
                <Col xs={12} className="fs-20">Description</Col>

                <Col className="help_text">(min. 100 words)</Col>
              </Row>
            </Col>

            <Col xs={5} className="setting_description">
              {renderDescription()}
            </Col>
          </Row>

          <div className="borderBottom" />

          <Row className="row_detail">
            <Col xs={7}>
              <Row className="setting_details">
                <Col xs={12} className="fs-20">Video Chat Rate</Col>

                <Col className="help_text">Credits per minute (no more than 200)</Col>
              </Row>
            </Col>

            <Col xs={5} className="setting_description">
              {renderVideoChatRate()}
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Form>
  );
};

Profile.defaultProps = {
  profile: {
    headline: 'N/A',
    description: 'N/A',
    videoChatRate: 0,
  },
  formData: {
    primaryPicUrl: '',
    backgroundPicUrl: '',
  },
  isCharacterLoading: false,
  errors: {
    updateChar: false,
    headline: '',
  },
};

Profile.propTypes = {
  profile: PropTypes.shape({
    headline: PropTypes.string,
    description: PropTypes.string,
    videoChatRate: PropTypes.number,
    profileImage: PropTypes.string,
    restaurantImage: PropTypes.string,
  }),
  formData: PropTypes.shape({
    primaryPicUrl: PropTypes.string,
    backgroundPicUrl: PropTypes.string,
  }),
  // reset: PropTypes.func.isRequired,
  // updateProfile: PropTypes.func.isRequired,
  isCharacterLoading: PropTypes.bool,
  errors: PropTypes.shape({
    updateChar: PropTypes.bool,
    headline: PropTypes.string,
  }),
};

export default Profile;

