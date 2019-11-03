import React from "react";
import PropTypes from "prop-types";

function Button({
  type = "button",
  className = "btn",
  handleClick,
  disabled = false,
  children,
  tooltips = false
}) {
  const submitStyles = disabled ? `${className} disabled` : className;

  return (
    <button
      type={type}
      onClick={handleClick}
      className={submitStyles}
      disabled={disabled}
    >
      {children}
      {tooltips && <p className="tooltips">{tooltips}</p>}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  handleClick: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.any.isRequired
};

export default Button;
