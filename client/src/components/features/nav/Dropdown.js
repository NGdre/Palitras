import React from "react";
import { Link } from "react-router-dom";
import { push } from "connected-react-router";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";

function Dropdown(props) {
  const userId = useSelector(state => state.user.userInfo._id);
  const dispatch = useDispatch();

  const redirectToProfile = () => {
    dispatch(push(`/users/${userId}/?tab=latest`));
  };

  return (
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
  );
}

Dropdown.propTypes = {
  logout: PropTypes.func.isRequired
};

export default Dropdown;
