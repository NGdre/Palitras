import React, { useEffect, useState } from "react";
import NotificationsListItem from "./NotificationsListItem";
import NotificationsSidebarContainer from "./NotificationsSidebarContainer";

import { useSelector } from "react-redux";
import {
  selectAllNotifications,
  selectReadNotifications,
  selectUnreadNotifications
} from "./notificationsSelector";

import { useTrail, animated } from "react-spring";

interface Notification {
  title: string;
  message: string;
  createdAt: string;
  isSecure: boolean;
  isRead: boolean;
  _id: string;
}

const Notifications = ({ show }: { show: string }) => {
  const allNotifications = useSelector(selectAllNotifications);
  const unreadNotifications = useSelector(selectUnreadNotifications);
  const readNotifications = useSelector(selectReadNotifications);

  const [notifications, setNotifications] = useState(unreadNotifications);

  const trail = useTrail(notifications.length, {
    config: { tension: 185, friction: 25 },
    opacity: 1,
    transform: "translateX(0)",
    from: { opacity: 0, transform: "translateX(-100px)" }
  });

  useEffect(() => {
    switch (show) {
      case "read":
        setNotifications(readNotifications);
        break;
      case "all":
        setNotifications(allNotifications);
        break;
      default:
        setNotifications(unreadNotifications);
        break;
    }
  }, [show, allNotifications, unreadNotifications, readNotifications]);

  const notificationsListClassName = notifications.length
    ? "notifications__list"
    : "notifications__list_empty";

  return (
    <div className="notifications">
      <NotificationsSidebarContainer show={show} />

      <ul className={notificationsListClassName}>
        {!notifications.length && (
          <div className="notifications__empty">
            <i className="material-icons">notifications</i>
            <h5>No new notifications</h5>
          </div>
        )}

        {trail.map((props, index) => {
          const {
            isRead,
            title,
            createdAt,
            isSecure,
            message,
            _id
          }: Notification = notifications[index];
          return (
            <animated.div key={index} style={props}>
              <NotificationsListItem
                id={_id}
                title={title}
                createdAt={createdAt}
                message={message}
                isSecure={isSecure}
                isRead={isRead}
              />
            </animated.div>
          );
        })}
      </ul>
    </div>
  );
};

export default Notifications;
