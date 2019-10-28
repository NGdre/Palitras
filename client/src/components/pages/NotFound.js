import React from "react";
import { Helmet } from "react-helmet";

function NotFound() {
  return (
    <>
      <Helmet>
        <title>Not found | Palitras</title>
      </Helmet>
      <div className="container">
        <p style={{ textAlign: "center" }}>404, This page not found</p>;
      </div>
    </>
  );
}

export default NotFound;
