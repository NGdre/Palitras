import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Dropdown(props) {
  return (
    <div className="dropdown">
      <i className="material-icons">person</i>
      <div className="dropdown-content">
        <Link to="/account/my-pictures" className="link dropdown-item">
          my pictures
        </Link>
        <Link to="/account/favorites" className="link dropdown-item">
          favorites
        </Link>
        <Link to="/account/upload" className="link dropdown-item">
          add picture
        </Link>
        <button className="logout dropdown-item" onClick={props.logout}>
          logout
        </button>
      </div>
    </div>
  );
}

Dropdown.propTypes = {
  logout: PropTypes.func.isRequired
};

export default Dropdown;
