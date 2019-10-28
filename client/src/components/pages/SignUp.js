import React from "react";
import { Helmet } from "react-helmet";
import AuthFormWrapper from "../features/auth/AuthFormWrapper";

function SignUp() {
  return (
    <>
      <Helmet>
        <title>Sign Up | Palitras</title>
      </Helmet>
      <AuthFormWrapper title="sign up" type="signup" />
    </>
  );
}

export default SignUp;
