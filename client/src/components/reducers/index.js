import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { authReducer } from "./authReducer";
import { pictureReducer } from "./pictureReducer";
import { connectRouter } from "connected-react-router";

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    user: userReducer,
    auth: authReducer,
    picture: pictureReducer
  });

export default createRootReducer;
