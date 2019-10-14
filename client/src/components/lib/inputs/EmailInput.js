import React from "react";
import withValidation from "../hoc/withValidation";
import { handleValue } from "../utils";
import PropTypes from "prop-types";

function EmailInput(props) {
  const handleChange = handleValue(props.onChange);
  const hasAutoFocus = Boolean(props.autoFocus);

  return (
    <div className="email-box">
      <input
        type="email"
        className="email"
        name="email"
        autoFocus={hasAutoFocus}
        required
        onChange={handleChange}
      />
      <label className="email-label">email</label>
      <i className="material-icons input-icon">mail_outline</i>
      <i className="material-icons valid">done</i>
      {props.renderMessage()}
    </div>
  );
}

function isValidEmail(email) {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
}

EmailInput.propTypes = {
  autoFocus: PropTypes.bool,
  renderMessage: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

export default withValidation(EmailInput, isValidEmail);
