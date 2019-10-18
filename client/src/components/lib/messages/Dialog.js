import React from "react";
import PropTypes from "prop-types";
import Button from "../buttons/Button";

function Dialog({ buttonNames, status, handleShow, title, message, action }) {
  return (
    status && (
      <div className="modal-message">
        <h6 className="title">{title}</h6>
        <p className="message">{message}</p>
        <div className="flex-right border-top">
          <div className="dialog-actions">
            <Button
              handleClick={() => handleShow(false)}
              className="btn-texted"
            >
              {buttonNames.cancel}
            </Button>
            <Button handleClick={action} className="btn-texted text-disabled">
              {buttonNames.confirm}
            </Button>
          </div>
        </div>
      </div>
    )
  );
}

Dialog.propTypes = {
  handleShow: PropTypes.func,
  action: PropTypes.func,
  status: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired
};

export default Dialog;
