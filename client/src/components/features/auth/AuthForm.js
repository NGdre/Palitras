import React, { useState, useEffect } from "react";
import useValidation from "../../lib/hooks/useValidation";
import useRedirect from "../../lib/hooks/useRedirect";
import validateAuth from "../../lib/utils/validateAuth";
import PropTypes from "prop-types";
import TextInput from "../../lib/inputs/TextInput";
import Button from "../../lib/buttons/Button";

function AuthForm({ title, sendDataToServer }) {
  const [isDataValid, setDataValid] = useState(false);
  const { redirectTo, renderRedirect } = useRedirect();

  const initialState = {
    email: "",
    password: ""
  };

  const { values, errors, handleChange, handleBlur } = useValidation(
    initialState,
    validateAuth
  );

  useEffect(() => {
    const noErrors = Object.keys(errors).length === 0;
    console.log(errors);
    setDataValid(noErrors);
  }, [errors]);

  function redirectHome() {
    redirectTo("/");
  }

  function handleSubmit(e) {
    e.preventDefault();

    sendDataToServer(values);
  }

  return (
    <>
      {renderRedirect()}
      <form onSubmit={handleSubmit}>
        <TextInput
          type="email"
          name="email"
          onChange={handleChange}
          onBlur={handleBlur}
          errMessage={errors.email}
        />
        <TextInput
          type="password"
          name="password"
          onChange={handleChange}
          onBlur={handleBlur}
          errMessage={errors.password}
        />
        <p>forgot password?</p>
        <Button type="submit" disabled={!isDataValid}>
          {title}
        </Button>
      </form>
    </>
  );
}

AuthForm.propTypes = {
  title: PropTypes.string.isRequired,
  sendDataToServer: PropTypes.func.isRequired
};

export default AuthForm;
