import React from "react";
import PropTypes from "prop-types";
import Button from "../buttons/Button";

function ModalNotification({ status, handleShow, message, action }) {
  return (
    status && (
      <div className="modal-message">
        <p>{message}</p>
        <Button handleClick={() => handleShow(false)} className="btn-texted">
          close
        </Button>
        <Button handleClick={action}>remove</Button>
      </div>
    )
  );
}

ModalNotification.propTypes = {
  handleShow: PropTypes.func,
  action: PropTypes.func,
  status: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired
};

export default ModalNotification;
