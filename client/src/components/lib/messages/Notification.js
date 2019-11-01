import React, { useState } from "react";

const NotificationMessage = ({ message }) => {
  if (!message) {
    return null;
  }

  return (
    <div className="notification">
      <p className="notification-message">{message}</p>
    </div>
  );
};

const Notification = ({ message }) => {
  const [showNotifications, setShow] = useState(false);

  function handleClick() {
    setShow(!showNotifications);
  }

  return (
    <>
      <i className="material-icons notification-icon" onClick={handleClick}>
        notifications
      </i>
      {showNotifications && <NotificationMessage message={message} />}
    </>
  );
};

export default Notification;
