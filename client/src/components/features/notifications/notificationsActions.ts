import { RSAA } from "redux-api-middleware";
import { userAPI } from "../../actions/api";
import { makeActionPrefix } from "../../utils";

const moduleName = "notifications";
const authToken = localStorage.getItem("token");

export const [
  USERS_NOTIFICATIONS_TYPES,
  MARK_AS_UNREAD_TYPES,
  MARK_AS_READ_TYPES
] = makeActionPrefix(moduleName, [
  "USERS_NOTIFICATIONS",
  "MARK_AS_UNREAD",
  "MARK_AS_READ"
]);

export const getUsersNotifications = () => ({
  [RSAA]: {
    endpoint: userAPI.fetchNotifications,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${authToken}`
    },
    types: USERS_NOTIFICATIONS_TYPES
  }
});

export const markAsUnread = (id: string) => ({
  [RSAA]: {
    endpoint: userAPI.markNotificationsUnread(id),
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${authToken}`
    },
    types: MARK_AS_UNREAD_TYPES
  }
});

export const markAsRead = (id: string) => ({
  [RSAA]: {
    endpoint: userAPI.markNotificationsRead(id),
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${authToken}`
    },
    types: MARK_AS_READ_TYPES
  }
});
