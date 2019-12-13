import React from "react";
import AuthFormWrapper from "../features/auth/AuthFormWrapper";
import { Helmet } from "react-helmet-async";

function Login() {
  return (
    <>
      <Helmet>
        <title>Login | Palitras</title>
      </Helmet>
      <AuthFormWrapper title="log in" type="login" />
    </>
  );
}

export default Login;
