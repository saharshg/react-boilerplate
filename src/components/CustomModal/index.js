import React from 'react';
import {
  Modal, ModalBody, ModalFooter,
} from 'reactstrap';
import PropTypes from 'prop-types';
import './style.scss';

const CustomModal = (props) => {
  const {
    className,
    open,
    toggle,
    header,
    body,
    footer,
    buttonText,
    onClick,
    footerLink,
  } = props;

  const handleClick = () => {
    onClick();
    toggle();
  };

  return (
    <Modal
      className={`chat-modal tip-Modal ${className}`}
      isOpen={open}
      toggle={toggle}
      backdrop={false}
    >
      <ModalBody className="chat-modal-body">
        <div className="text-center">
          <h4>{header}</h4>
          {body}
          <button type="button" onClick={handleClick} className="btn">{buttonText}</button>
        </div>
      </ModalBody>
      <ModalFooter className="chat-modal-footer">
        <p role="presentation" onClick={footerLink}>{footer}</p>
      </ModalFooter>
    </Modal>
  );
};

CustomModal.defaultProps = {
  className: '',
  open: false,
  header: '',
  body: '',
  buttonText: 'OK',
  footer: '',
  onClick: () => {},
  footerLink: () => {},
};

CustomModal.propTypes = {
  className: PropTypes.string,
  open: PropTypes.bool,
  toggle: PropTypes.func.isRequired,
  header: PropTypes.string,
  body: PropTypes.string,
  footer: PropTypes.string,
  buttonText: PropTypes.string,
  onClick: PropTypes.func,
  footerLink: PropTypes.func,
};

export default CustomModal;
