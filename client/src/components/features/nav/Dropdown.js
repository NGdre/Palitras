import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import useRedirect from "../../lib/hooks/useRedirect";

function Dropdown(props) {
  const userId = useSelector(state => state.user.userInfo._id);
  const { redirectTo, renderRedirect } = useRedirect();

  const redirectToProfile = () => {
    redirectTo(`/users/${userId}/?tab=latest`);
  };

  return (
    <>
      {renderRedirect()}
      <div className="dropdown">
        <i className="material-icons" onClick={redirectToProfile}>
          person
        </i>
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
    </>
  );
}

Dropdown.propTypes = {
  logout: PropTypes.func.isRequired
};

export default Dropdown;
