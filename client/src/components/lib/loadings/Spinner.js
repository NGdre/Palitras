import React from "react";
import PropTypes from "prop-types";

function Spinner({ display = true }) {
  display = display ? "block" : "none";
  return (
    <div className="wrapper">
      <div className="spinner-big" style={{ display }} />
    </div>
  );
}

Spinner.propTypes = {
  display: PropTypes.bool
};

export default Spinner;
