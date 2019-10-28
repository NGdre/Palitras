import React from "react";
import { Helmet } from "react-helmet";
import AuthFormWrapper from "../features/auth/AuthFormWrapper";

function ResetPassword() {
  return (
    <>
      <Helmet>
        <title>Reset Password | Palitras</title>
      </Helmet>
      <AuthFormWrapper title="reset password" type="resetpassword" />
    </>
  );
}

export default ResetPassword;
