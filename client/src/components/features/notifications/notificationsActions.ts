import { RSAA } from "redux-api-middleware";
import { userAPI } from "../../actions/api";
import { makeActionPrefix } from "../../lib/utils";

const moduleName = "notifications";
const authToken = localStorage.getItem("token");

export const [USERS_NOTIFICATIONS_TYPES] = makeActionPrefix(moduleName, [
  "USERS_NOTIFICATIONS"
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
