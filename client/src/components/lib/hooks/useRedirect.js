import React, { useState } from "react";
import { Redirect } from "react-router-dom";

export default function useRedirect() {
  const [redirect, setRedirect] = useState(false);
  const [pathname, setPathname] = useState();

  function redirectTo(newPathname) {
    setPathname(newPathname);
    setRedirect(true);
  }

  function renderRedirect() {
    if (redirect) return <Redirect to={pathname} />;
  }

  return {
    redirectTo,
    renderRedirect
  };
}
