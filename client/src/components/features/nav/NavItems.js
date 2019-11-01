import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";
import DropdownContainer from "./DropdownContainer";
import PropTypes from "prop-types";

const NotificationIcon = () => {
  const dispatch = useDispatch();

  const redirectToNotifications = () => {
    dispatch(push("/notifications"));
  };

  return (
    <div className="notifications">
      <i
        className="material-icons notifications__icon"
        onClick={redirectToNotifications}
      >
        notifications
      </i>
      <div className="notifications__badge"></div>
    </div>
  );
};

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
