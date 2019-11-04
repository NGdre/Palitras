import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from "react-redux";
import Notifications from "./Notifications";
import { getUsersNotifications } from "./notificationsActions";

const NotificationsPage = () => {
  interface Pathname {
    router: {
      location: {
        pathname: string;
      };
    };
  }
  const [showNotificationType, setNotificationType] = useState("unread");
  const pathname = useSelector(
    (state: Pathname) => state.router.location.pathname
  );

  useEffect(() => {
    switch (pathname) {
      case "/notifications/read":
        setNotificationType("read");
        break;
      case "/notifications/all":
        setNotificationType("all");
        break;
      default:
        setNotificationType("unread");
    }
  }, [pathname]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersNotifications());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>{"Notifications | Palitras"}</title>
      </Helmet>
      <div className="container notification-page">
        <h3 className="center">Notifications</h3>
        <Notifications show={showNotificationType} />
      </div>
    </>
  );
};

export default NotificationsPage;
