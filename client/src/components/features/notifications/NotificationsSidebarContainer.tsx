import React from "react";
import NotificationsSidebar from "./NotificationsSidebar";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";

import {
  selectNotificationsAmount,
  selectUnreadNotificationsAmount,
  selectReadNotificationsAmount
} from "./notificationsSelector";

const NotificationsSidebarContainer = ({ show }: { show: string }) => {
  const amount = useSelector(selectNotificationsAmount);
  const readAmount = useSelector(selectReadNotificationsAmount);
  const unreadAmount = useSelector(selectUnreadNotificationsAmount);

  const notificationsTabs = [
    {
      type: "unread",
      notificationsAmount: unreadAmount
    },
    {
      type: "read",
      notificationsAmount: readAmount
    },
    {
      type: "all",
      notificationsAmount: amount
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
