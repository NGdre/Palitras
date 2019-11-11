import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { authReducer } from "./authReducer";
import { pictureReducer } from "./pictureReducer";
import { notificationsReducer } from "../features/notifications/notificationsReducer";
import { snackbarReducer } from "../features/snackbar/snackbarReducer";
import { connectRouter } from "connected-react-router";

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    user: userReducer,
    auth: authReducer,
    picture: pictureReducer,
    notifications: notificationsReducer,
    snackbar: snackbarReducer
  });

export default createRootReducer;
