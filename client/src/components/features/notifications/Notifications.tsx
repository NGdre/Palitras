import React, { useEffect, useState } from "react";
import NotificationsListItem from "./NotificationsListItem";
import NotificationsSidebarContainer from "./NotificationsSidebarContainer";

import {
  selectNotifications,
  selectUnreadNotifications,
  selectReadNotifications
} from "../../actions/userSelectors";
import { useSelector } from "react-redux";

interface Notification {
  title: string;
  message: string;
  createdAt: string;
  isSecure: boolean;
}

const Notifications = ({ show }: { show: string }) => {
  const allNotifications = useSelector(selectNotifications);
  const unreadNotifications = useSelector(selectUnreadNotifications);
  const readNotifications = useSelector(selectReadNotifications);

  const [notifications, setNotifications] = useState(unreadNotifications);

  useEffect(() => {
    switch (show) {
      case "read":
        setNotifications(readNotifications);
        break;
      case "all":
        setNotifications(allNotifications);
      default:
        setNotifications(unreadNotifications);
        break;
    }
  }, [show, allNotifications, unreadNotifications, readNotifications]);

  return (
    <div className="notifications">
      <NotificationsSidebarContainer show={show} />
      <ul className="notifications__list">
        {notifications.map(({ title, createdAt, message }: Notification) => {
          return (
            <NotificationsListItem
              title={title}
              createdAt={createdAt}
              message={message}
              isSecure={true}
              key={createdAt}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Notifications;
