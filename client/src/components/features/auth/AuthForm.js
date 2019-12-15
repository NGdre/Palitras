import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { useSelector } from "react-redux";
import { selectMessage } from "../../actions/authSelectors";
import { maxPasswordLength, minPasswordLength } from "../../../setupEnv";

import useValidation from "../../hooks/useValidation";
import validateAuth from "../../utils/validateAuth";
import TextInput from "../../inputs/TextInput";
import Button from "../../buttons/Button";
import Form from "../../forms/Form";

function AuthForm({ title, type, sendDataToServer }) {
  const [isDataValid, setDataValid] = useState(false);
  const [isPasswordVisible, setPasswordVisibile] = useState(false);
  const message = useSelector(selectMessage);

  const initialState = {
    email: "",
    password: ""
  };

  const { values, errors, handleChange, handleBlur } = useValidation(
    initialState,
    validateAuth,
    {
      maxLength: { password: maxPasswordLength },
      minLength: { password: minPasswordLength }
    }
  );

  useEffect(() => {
    const noErrors = Object.keys(errors).length === 0;

    setDataValid(noErrors);
  }, [errors]);

  function handleSubmit(e) {
    e.preventDefault();

    sendDataToServer(values);
  }

  const handleVisibilityPassword = () => {
    setPasswordVisibile(!isPasswordVisible);
  };

  const toggleVisibilityIconSrc = isPasswordVisible
    ? "/images/hide-visibility.svg"
    : "/images/show-visibility.svg";
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <TextInput
          type="email"
          name="email"
          autofocus
          onChange={handleChange}
          onBlur={handleBlur}
          outlined
          required
          errMessage={errors.email}
          showValidIcon
          value={values.email}
        >
          <i className="material-icons leading-icon">mail_outline</i>
          <p className="err">{errors.email}</p>
        </TextInput>
        {type !== "resetpassword" && (
          <TextInput
            type={isPasswordVisible ? "text" : "password"}
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            outlined
            required
            errMessage={errors.password || message}
            value={values.password}
            showValidIcon
            characterCount={maxPasswordLength}
          >
            <i className="material-icons leading-icon">lock</i>
            <Button
              className="btn-icon trailing-icon"
              onClick={handleVisibilityPassword}
            >
              <img src={toggleVisibilityIconSrc} alt="toggle visibility" />
            </Button>
            <p className="err">{errors.password || message}</p>
          </TextInput>
        )}
        <div className="form-bottom border-top">
          <Button
            type="submit"
            disabled={!isDataValid}
            className="btn auth-form__submit-btn"
          >
            {title}
          </Button>
        </div>
      </Form>
    </>
  );
}

AuthForm.propTypes = {
  title: PropTypes.string.isRequired,
  sendDataToServer: PropTypes.func.isRequired
};

export default AuthForm;
