import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { authReducer } from "./authReducer";
import { pictureReducer } from "./pictureReducer";

export default combineReducers({
  user: userReducer,
  auth: authReducer,
  picture: pictureReducer
});
