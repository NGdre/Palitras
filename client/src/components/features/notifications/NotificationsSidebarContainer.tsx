import React from "react";
import NotificationsSidebar from "./NotificationsSidebar";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";

const NotificationsSidebarContainer = ({ show }: { show: string }) => {
  const notificationsTabs = [
    {
      type: "unread",
      notificationsAmount: 2
    },
    {
      type: "read",
      notificationsAmount: 1
    },
    {
      type: "all",
      notificationsAmount: 3
    }
  ];

  const dispatch = useDispatch();

  const redirectToNotification = (path: string) => () => {
    const fullPath =
      path === "unread" ? "/notifications/" : `/notifications/${path}`;
    dispatch(push(fullPath));
  };

  return (
    <NotificationsSidebar
      show={show}
      notificationsTabs={notificationsTabs}
      handleClick={redirectToNotification}
    />
  );
};

export default NotificationsSidebarContainer;
