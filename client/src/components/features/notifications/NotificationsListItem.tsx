import React, { useEffect, useState } from "react";
import ButtonIcon from "../../lib/buttons/ButtonIcon";
import TimeAgo from "react-timeago";
import { useDispatch, useSelector } from "react-redux";
import { markAsRead, markAsUnread } from "./notificationsActions";
import { setSnackbarMessage, clearSnackbar } from "../snackbar/snackbarActions";
import { selectNotificationsResponseMessage } from "./notificationsSelector";
import { selectSnackbarOpen } from "../snackbar/snackbarSelectors";

import {
  incrementUnreadAmount,
  decrementUnreadAmount
} from "../../actions/user";

interface Notification {
  title: string;
  message: string;
  createdAt: string;
  isSecure: boolean;
  isRead: boolean;
  id: string;
}

const NotificationsListItem: React.FC<Notification> = ({
  title,
  message,
  createdAt,
  isSecure,
  isRead,
  id
}) => {
  const dispatch = useDispatch();

  const notificationResponseMessage = useSelector(
    selectNotificationsResponseMessage
  );

  const snackbarOpen = useSelector(selectSnackbarOpen);

  const [shouldShowSnackbar, setShowSnackbar] = useState(false);

  useEffect(() => {
    if (shouldShowSnackbar && notificationResponseMessage) {
      dispatch(setSnackbarMessage(notificationResponseMessage));
      setShowSnackbar(false);
    }
  }, [dispatch, shouldShowSnackbar, notificationResponseMessage]);

  useEffect(() => {
    if (shouldShowSnackbar && snackbarOpen) {
      dispatch(clearSnackbar());
    }
  }, [dispatch, snackbarOpen, shouldShowSnackbar]);

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
          <div className="notifications__list-item-date">
            <TimeAgo date={createdAt}></TimeAgo>
          </div>
          {isRead ? (
            <ButtonIcon
              iconName="markunread"
              tooltips="Mark as unread"
              handleClick={() => {
                setShowSnackbar(true);
                dispatch(incrementUnreadAmount());
                dispatch(markAsUnread(id));
              }}
            />
          ) : (
            <ButtonIcon
              iconName="markunread"
              tooltips="Mark as read"
              handleClick={() => {
                setShowSnackbar(true);
                dispatch(decrementUnreadAmount());
                dispatch(markAsRead(id));
              }}
            />
          )}
        </div>
      </div>
    </li>
  );
};

export default NotificationsListItem;
