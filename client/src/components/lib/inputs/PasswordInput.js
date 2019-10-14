import React from "react";
import withValidation from "../hoc/withValidation";
import { handleValue } from "../utils";
import PropTypes from "prop-types";

function PasswordInput(props) {
  const handleChange = handleValue(props.onChange);
  return (
    <div className="password-box">
      <input
        type="password"
        className="password"
        name="password"
        required
        onChange={handleChange}
      />
      <label className="password-label">password</label>
      <i className="material-icons input-icon">vpn_key</i>
      <i className="material-icons valid">done</i>
      <p className="helper-text">
        password should contain letters and numbers in range 3 to 16
      </p>
      {props.renderMessage()}
    </div>
  );
}

function isValidPassword(pass) {
  const regex = /^[a-zA-Z0-9]{3,16}$/;
  return regex.test(pass);
}

PasswordInput.propTypes = {
  renderMessage: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

export default withValidation(PasswordInput, isValidPassword);
