import React from "react";
import PropTypes from "prop-types";

function ErrInput(props) {
  return <p className="err">{props.text}</p>;
}

ErrInput.propTypes = {
  text: PropTypes.string.isRequired
};

export default ErrInput;
