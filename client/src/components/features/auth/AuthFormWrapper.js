import React from "react";
import AuthFormContainer from "./AuthFormContainer";
import PropTypes from "prop-types";

function AuthFormWrapper(props) {
  const { title, type } = props;

  return (
    <div className="container wrapper">
      <div className="auth-form">
        <div className="left">
          <h2>{title}</h2>
        </div>
        <div className="right">
          <AuthFormContainer title={title} type={type} />
        </div>
      </div>
    </div>
  );
}

AuthFormContainer.propTypes = {
  title: PropTypes.string.isRequired
};

export default AuthFormWrapper;
