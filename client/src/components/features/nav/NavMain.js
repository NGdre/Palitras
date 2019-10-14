import React from "react";
import NavItems from "./NavItems";
import { Link } from "react-router-dom";

function NavMain() {
  return (
    <div className="main-nav">
      <Link to="/" className="brand-logo">
        <img src="/images/logo.svg" alt="logo" />
        <p className="brand">Palitras</p>
      </Link>
      <NavItems />
    </div>
  );
}

export default NavMain;
