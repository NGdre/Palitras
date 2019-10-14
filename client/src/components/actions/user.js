import { createActions, createAction } from "redux-actions";
import makeRequestToAPI from "../lib/utils/makeRequestToAPI";
import { userAPI } from "./api";

const reducerName = "user";
const createDispatchAPIFlow = makeRequestToAPI(reducerName);

export const fetchInfoActionCreators = createActions({
  [reducerName]: {
    FETCH_INFO_REQUEST: undefined,
    FETCH_INFO_SUCCESS: data => ({ data }),
    FETCH_INFO_FAIL: err => ({ err })
  }
});

export const fetchMyPicturesActionCreators = createActions({
  [reducerName]: {
    FETCH_MY_PICTURES_REQUEST: undefined,
    FETCH_MY_PICTURES_SUCCESS: data => ({ data }),
    FETCH_MY_PICTURES_FAIL: err => ({ err })
  }
});

export const addPictureInFavorites = createAction(
  `${reducerName}/ADD_PICTURE_IN_FAVORITES`,
  pictureId => ({ pictureId })
);

export const removePictureFromFavorites = createAction(
  `${reducerName}/REMOVE_PICTURE_FROM_FAVORITES`,
  pictureId => ({ pictureId })
);

export const setEditPicture = createAction(
  `${reducerName}/SET_EDIT_PICTURE`,
  pictureId => ({ pictureId })
);

const userFetchDataAPI = url => () => async dispatch =>
  createDispatchAPIFlow(url, dispatch, fetchInfoActionCreators);

const fetchMyPicturesAPI = url => () => async dispatch =>
  createDispatchAPIFlow(url, dispatch, fetchMyPicturesActionCreators);

export const fetchUserInfo = userFetchDataAPI(userAPI.fetchUserInfo);
export const fetchMyPictures = fetchMyPicturesAPI(userAPI.fetchMyPictures);
