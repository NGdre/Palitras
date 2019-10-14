import React from "react";
import PropTypes from "prop-types";

export const defaultClassName = "img";

function ConditionalImage({ src, className = defaultClassName }) {
  return (
    <div className="image-wrapper">
      {src && <img className={className} src={src} alt="preview" />}
    </div>
  );
}

ConditionalImage.propTypes = {
  src: PropTypes.string,
  className: PropTypes.string
};

export default ConditionalImage;
