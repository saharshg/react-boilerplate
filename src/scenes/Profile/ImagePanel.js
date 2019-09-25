import React, { useState, useEffect } from 'react';
import {
  Card, CardBody, Button,
  CardHeader, Label, Badge,
  Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import { Field } from 'redux-form';
import { PropTypes } from 'prop-types';
import AvatarEditor from 'react-avatar-editor';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

import { renderFileInput } from '../../utils/formUtils';
import CustomModal from '../../components/CustomModal';

const ImagePanel = (props) => {
  const {
    backgroundPic,
    primaryPic,
    updateProfile,
    charId,
    formData: { backgroundPicUrl, primaryPicUrl } = {},
    reset,
    isCharacterLoading,
  } = props;

  const [isImageValid, setisImageValid] = useState(true);
  const [backgroundPicModal, setBackgroundPicModal] = useState(false);
  const [leavePageModal, setLeavePageModal] = useState(false);
  const [editBackgroundImage, setBackgroundImage] = useState(false);
  const [primaryPicModal, setPrimaryPicModal] = useState(false);

  useEffect(() => {
    if (editBackgroundImage && (backgroundPicUrl.length > 0)) {
      const img = new Image();
      img.src = backgroundPicUrl;
      img.onload = () => {
        if ((img.naturalHeight > 0 && img.naturalHeight < 300)
          || (img.naturalWidth > 0 && img.naturalWidth < 900)
        ) {
          setBackgroundPicModal(true);
        } else {
          setisImageValid(true);
        }
      };
    }
  }, [backgroundPicUrl]);

  const togglePrimaryPicModal = () => setPrimaryPicModal(!primaryPicModal);
  useEffect(() => {
    if (primaryPicUrl) {
      togglePrimaryPicModal();
    }
  }, [primaryPicUrl]);

  const [editInfo, setEditInfo] = useState(true);
  const [scale, setScale] = useState(1);
  const [updatingField, setUpdatingField] = useState();
  const [backgroundEditor, setBackgroundEditor] = useState({});
  const [primaryEditor, setPrimaryEditor] = useState({});

  const toggleLeavePageModal = () => setLeavePageModal(!leavePageModal);
  const setBackgroundPicRef = (avatarEditor = {}) => setBackgroundEditor(avatarEditor);
  const setPrimaryPicRef = (avatarEditor = {}) => setPrimaryEditor(avatarEditor);

  const resetBackgroundPicPanel = () => {
    setUpdatingField('');
    setisImageValid(false);
    reset();
  };

  const resetPrimaryPicPanel = () => {
    togglePrimaryPicModal();
    setUpdatingField('');
    reset();
  };

  /* required for initialising editor ref */
  useEffect(() => {
    if (backgroundEditor == null) {
      setBackgroundPicRef();
    }
  }, [backgroundEditor]);

  // useEffect(() => {
  //   if (primaryEditor == null) {
  //     setPrimaryPicRef();
  //   }
  // }, [primaryEditor]);

  const onSave = (picture) => {
    let canvas = {};
    if ((picture === 'backgroundPic') && backgroundEditor) {
      // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
      // drawn on another canvas, or added to the DOM.
      canvas = backgroundEditor.getImage().toDataURL();
      fetch(canvas)
        .then(res => res.blob())
        .then((blob) => {
          const payload = {
            id: charId,
            [picture]: blob,
          };

          updateProfile(payload);
          setBackgroundPicRef();
        });
    }

    if ((picture === 'primaryPic') && primaryEditor) {
      // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
      // drawn on another canvas, or added to the DOM.
      canvas = primaryEditor.getImage().toDataURL();
      fetch(canvas)
        .then(res => res.blob())
        .then((blob) => {
          const payload = {
            id: charId,
            [picture]: blob,
          };

          updateProfile(payload);
          setPrimaryPicRef();
        });
    }

    if (picture === 'primaryPic') {
      togglePrimaryPicModal();
    }

    if (picture === 'backgroundPic') {
      setBackgroundImage(false);
    }
  };

  const renderBackgroundEditor = () => {
    if (editBackgroundImage && isImageValid && backgroundEditor) {
      const { canvas: { offsetParent: { clientWidth } = {} } = {} } = backgroundEditor;
      return (
        <>
          <AvatarEditor
            ref={setBackgroundPicRef}
            image={backgroundPicUrl}
            width={clientWidth}
            height={300}
            border={1}
            onMouseMove={() => setEditInfo(false)}
            onMouseUp={() => setEditInfo(true)}
          />
          {editInfo && (
            <Badge>
              <i className="fa fa-arrows" aria-hidden="true" />
              Drag to move photo
            </Badge>
          )}
        </>
      );
    }

    if ((updatingField === 'backgroundPic') && isCharacterLoading) {
      return (
        <>
          <div
            className="backgroundPic blurImage"
            style={{
              backgroundImage: `url(${backgroundPic})`,
            }}
          />
          <i className="fa fa-spinner fa-spin" />
        </>
      );
    }

    return (
      <div
        className="backgroundPic"
        style={{
          backgroundImage: `url(${backgroundPic})`,
        }}
      />
    );
  };

  const renderPrimaryEditor = () => (
    <>
      <AvatarEditor
        ref={setPrimaryPicRef}
        image={primaryPicUrl}
        width={300}
        height={300}
        border={100}
        borderRadius={140}
        color={[255, 255, 255, 0.6]} // RGBA
        scale={scale}
        onMouseMove={() => setEditInfo(false)}
        onMouseUp={() => setEditInfo(true)}
      />
      {editInfo && (
        <Badge>
          <i className="fa fa-arrows" aria-hidden="true" />
          Drag to reposition photo
        </Badge>
      )}
    </>
  );

  const renderPrimaryPicModal = () => {
    const minScale = 1;
    const maxScale = 3;
    return (
      <Modal
        id="editPrimaryPicModal"
        size="lg"
        isOpen={primaryPicModal}
        toggle={togglePrimaryPicModal}
        backdrop={false}
      >
        <ModalHeader>
          Create profile photo
        </ModalHeader>
        <ModalBody>
          {renderPrimaryEditor()}
        </ModalBody>
        <ModalFooter className="justify-content-between">
          <div className="d-flex justify-content-between w-100">
            <div>
              <Button className="btn-outline-secondary" onClick={() => setScale(1)}>
                Reset
              </Button>
            </div>
            <div className="d-flex align-items-center ml120">
              <i
                className="fa fa-minus"
                aria-hidden="true"
                onClick={() => setScale(() => {
                  if (scale <= minScale) {
                    return scale;
                  }
                  return scale - 0.1;
                })}
              />
              <InputRange
                maxValue={maxScale}
                minValue={minScale}
                step={0.01}
                value={scale}
                onChange={setScale}
              />
              <i
                className="fa fa-plus"
                aria-hidden="true"
                onClick={() => setScale(() => {
                  if (scale > (maxScale - 0.1)) {
                    return scale;
                  }
                  return scale + 0.1;
                })}
              />
            </div>
            <div>
              <Button
                className="btn-outline-secondary mr-2"
                onClick={toggleLeavePageModal}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  onSave('primaryPic');
                  reset();
                }}
              >
                Save changes
              </Button>
            </div>
          </div>
        </ModalFooter>
      </Modal>
    );
  };

  const renderProfilePic = () => {
    if (primaryPic) {
      return (
        <div
          className="primaryPic"
          style={{
            backgroundImage: `url(${primaryPic})`,
          }}
        />
      );
    }
    return <div className="profile-placeholder" />;
  };

  return (
    <Card className="imagePanel">
      <CustomModal
        header="Try a different image"
        body="Your background picture must be at least 900 pixels wide and 300 pixels tall"
        open={backgroundPicModal}
        toggle={() => setBackgroundPicModal(() => {
          if (backgroundPicModal) {
            /* Close background image editing if picture not valid */
            setBackgroundImage(false);
          }

          return !backgroundPicModal;
        })}
      />

      <CustomModal
        header="Changes not saved"
        body="The changes you made to your profile picture won't be saved if you close this dialogue"
        buttonText="LEAVE THIS PAGE"
        footer="Stay on this page"
        open={leavePageModal}
        footerLink={toggleLeavePageModal}
        onClick={updatingField === 'primaryPic' ? resetPrimaryPicPanel : resetBackgroundPicPanel}
        toggle={toggleLeavePageModal}
      />

      {renderPrimaryPicModal()}

      <CardHeader className="picture">
        {(backgroundPic || backgroundPicUrl) ? renderBackgroundEditor() : 'No data available'}
      </CardHeader>

      <CardBody className="text-right">
        <div className="profilePic">
          {((updatingField === 'primaryPic') && isCharacterLoading) ? (
            <>
              <div
                className="primaryPic blurImage"
                style={{
                  backgroundImage: `url(${primaryPic})`,
                }}
              />
              <i className="fa fa-spinner fa-spin" />
            </>
          ) : (
            <>
              {renderProfilePic()}
              <div className="updateProfilePic">
                <Field
                  name="primaryPic"
                  type="file"
                  handleChange={() => setUpdatingField('primaryPic')}
                  customInput={(
                    <Label htmlFor="primaryPic" className="primaryPic">
                      <span>Update</span>
                    </Label>
                  )}
                  component={renderFileInput}
                />
              </div>
            </>
          )}
        </div>

        {(editBackgroundImage && isImageValid) ? (
          <>
            <Button
              className="btn-outline-secondary mr-2"
              onClick={toggleLeavePageModal}
            >
              Cancel
            </Button>
            <Button onClick={() => onSave('backgroundPic')}>
              Save changes
            </Button>
          </>
        ) : (
          <Field
            name="backgroundPic"
            type="file"
            customInput={(
              <Label htmlFor="backgroundPic" className="backgroundPic">
                <div className="d-flex justify-content-between align-items-center">
                  <div>Update photo</div>
                </div>
              </Label>
            )}
            handleChange={() => {
              setBackgroundImage(true);
              setUpdatingField('backgroundPic');
            }}
            component={renderFileInput}
          />
        )}
      </CardBody>
    </Card>
  );
};

ImagePanel.defaultProps = {
  charId: -1,
  backgroundPic: '',
  primaryPic: '',
  isCharacterLoading: false,
  formData: {
    primaryPicUrl: '',
    backgroundPicUrl: '',
  },
  reset: () => {},
};

ImagePanel.propTypes = {
  charId: PropTypes.number,
  backgroundPic: PropTypes.string,
  primaryPic: PropTypes.string,
  updateProfile: PropTypes.func.isRequired,
  formData: PropTypes.shape({
    primaryPicUrl: PropTypes.string,
    backgroundPicUrl: PropTypes.string,
  }),
  reset: PropTypes.func,
  isCharacterLoading: PropTypes.bool,
};

export default ImagePanel;
