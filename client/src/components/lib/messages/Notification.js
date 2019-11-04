import React from "react";
import { push } from "connected-react-router";
import { useDispatch, useSelector } from "react-redux";

const NotificationIcon = () => {
  const dispatch = useDispatch();
  const unreadAmount = useSelector(state => state.notifications.unreadAmount);

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
      {unreadAmount && (
        <div className="notifications__badge">{unreadAmount}</div>
      )}
    </div>
  );
};

export default NotificationIcon;
