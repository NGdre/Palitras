import React from "react";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";

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

export default NotificationIcon;
