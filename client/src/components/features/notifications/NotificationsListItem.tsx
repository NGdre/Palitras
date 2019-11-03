import React from "react";
import ButtonIcon from "../../lib/buttons/ButtonIcon";

interface Notification {
  title: string;
  message: string;
  createdAt: string;
  isSecure: boolean;
}

const NotificationsListItem: React.FC<Notification> = ({
  title,
  message,
  createdAt,
  isSecure
}) => {
  return (
    <li className="notifications__list-item">
      <h6 className="notifications__list-item-title">{title}</h6>
      <div className="notifications__list-item-body">
        {isSecure && (
          <div className="notifications__list-item-type">
            <i className="material-icons">security</i>
          </div>
        )}
        <p className="notifications__list-item-message">{message}</p>
        <div className="notifications__list-item-body-right">
          <p className="notifications__list-item-date">{createdAt}</p>
          <ButtonIcon iconName="markunread" tooltips="Mark as unread" />
        </div>
      </div>
    </li>
  );
};

export default NotificationsListItem;
