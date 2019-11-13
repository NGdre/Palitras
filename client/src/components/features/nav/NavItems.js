import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import DropdownContainer from "./DropdownContainer";
import PropTypes from "prop-types";
import NotificationIcon from "../notifications/NotificationIcon";

function NavItems(props) {
  const { isLogged } = props;

  return (
    <ul className="nav-items">
      {isLogged ? (
        <>
          <li>
            <NotificationIcon />
          </li>
          <li>
            <DropdownContainer />
          </li>
        </>
      ) : (
        <>
          <li>
            <Link to="/login" className="btn">
              Login
            </Link>
          </li>
          <li>
            <Link to="/sign-up" className="btn">
              Sign up
            </Link>
          </li>
        </>
      )}
    </ul>
  );
}

NavItems.propTypes = {
  isLogged: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    isLogged: state.auth.isLogged
  };
};

export default connect(mapStateToProps)(NavItems);
