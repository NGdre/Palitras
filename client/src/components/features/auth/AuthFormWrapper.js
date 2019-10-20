import React from "react";

import { Link } from "react-router-dom";
import AuthFormContainer from "./AuthFormContainer";
import PropTypes from "prop-types";

function AuthFormWrapper(props) {
  const { title, type } = props;

  return (
    <div className="container wrapper">
      <div className="auth-form">
        <h5 className="form-heading">{title}</h5>
        {type === "resetpassword" && (
          <p className="reset-password-info">
            Enter your email address below and we'll send you a link to reset
            your password.
          </p>
        )}
        <AuthFormContainer title={title} type={type} />
        {type !== "resetpassword" && (
          <Link to="/forgot-password" className="forgot-password link">
            forgot password?
          </Link>
        )}
        {type === "login" && (
          <p className="alternate-action-text">
            Don't have an account yet?{" "}
            <Link to="/sign-up" className="alternate-action link">
              Sign up
            </Link>
          </p>
        )}
        {type === "signup" && (
          <p className="alternate-action-text">
            already have an account?{" "}
            <Link to="/login" className="alternate-action link">
              Log in
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}

AuthFormContainer.propTypes = {
  title: PropTypes.string.isRequired
};

export default AuthFormWrapper;
