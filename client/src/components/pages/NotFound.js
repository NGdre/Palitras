import React from "react";
import { Helmet } from "react-helmet-async";

function NotFound() {
  return (
    <>
      <Helmet>
        <title>Not found | Palitras</title>
      </Helmet>
      <div className="container" style={{ textAlign: "center" }}>
        <h2>Page not found</h2>
        <strong style={{ fontSize: "24px" }}>Error 404</strong>
      </div>
    </>
  );
}

export default NotFound;
