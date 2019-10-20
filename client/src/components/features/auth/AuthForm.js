import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { useSelector } from "react-redux";
import { selectMessage } from "../../actions/authSelectors";
import { maxPasswordLength, minPasswordLength } from "../../../setupEnv";

import useValidation from "../../lib/hooks/useValidation";
import validateAuth from "../../lib/utils/validateAuth";
import TextInput from "../../lib/inputs/TextInput";
import Button from "../../lib/buttons/Button";

function AuthForm({ title, type, sendDataToServer }) {
  const [isDataValid, setDataValid] = useState(false);
  const message = useSelector(selectMessage);

  const initialState = {
    email: "",
    password: ""
  };

  const {
    values,
    errors,
    shouldShowErr,
    handleChange,
    handleBlur
  } = useValidation(initialState, validateAuth, {
    maxLength: { password: maxPasswordLength },
    minLength: { password: minPasswordLength }
  });

  useEffect(() => {
    const noErrors = Object.keys(errors).length === 0;

    setDataValid(noErrors);
  }, [errors]);

  function handleSubmit(e) {
    e.preventDefault();

    sendDataToServer(values);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextInput
          type="email"
          name="email"
          autofocus={true}
          onChange={handleChange}
          onBlur={handleBlur}
          outlined={true}
          errMessage={errors.email}
          showErr={shouldShowErr.email}
          required={true}
          showValidIcon={true}
          value={values.email}
          leadingIcon="mail_outline"
        />
        {type !== "resetpassword" && (
          <TextInput
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            outlined={true}
            errMessage={errors.password || message}
            showErr={shouldShowErr.password}
            required={true}
            value={values.password}
            leadingIcon="lock"
            showValidIcon={true}
            characterCount={maxPasswordLength}
          />
        )}
        <div className="form-bottom border-top">
          <Button type="submit" disabled={!isDataValid}>
            {title}
          </Button>
        </div>
      </form>
    </>
  );
}

AuthForm.propTypes = {
  title: PropTypes.string.isRequired,
  sendDataToServer: PropTypes.func.isRequired
};

export default AuthForm;
