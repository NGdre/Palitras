import React from "react";

interface NotificationsSidebar {
  notificationsTabs: {
    type: string;
    notificationsAmount: number;
  }[];
  show: string;
  handleClick: (path: string) => () => void;
}

const NotificationsSidebar: React.FC<NotificationsSidebar> = ({
  notificationsTabs,
  show,
  handleClick
}) => {
  return (
    <ul className="sidebar">
      {notificationsTabs.map(tab => {
        const isCurrent = show === tab.type;
        return (
          <li
            className={
              isCurrent
                ? "sidebar__item sidebar__item_current"
                : "sidebar__item"
            }
            onClick={handleClick(tab.type)}
            key={tab.type}
          >
            {tab.type}
            <p className="sidebar__item-amount">{tab.notificationsAmount}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default NotificationsSidebar;
