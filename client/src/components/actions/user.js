import { createActions, createAction } from "redux-actions";
import { RSAA } from "redux-api-middleware";
import makeRequestToAPI from "../utils/makeRequestToAPI";
import { makeActionPrefix } from "../utils";
import { userAPI } from "./api";

const reducerName = "user";
const createDispatchAPIFlow = makeRequestToAPI(reducerName);

export const [
  USERS_PICTURES_TYPES,
  USERS_FAVORITES_TYPES
] = makeActionPrefix(reducerName, ["USERS_PICTURES", "USERS_FAVORITES"]);

export const getUsersPictures = (userId, page) => ({
  [RSAA]: {
    endpoint: `/api/pictures?author=${userId}&sort=createdAt&page=${page}&limit=10`,
    method: "GET",
    headers: { "Content-Type": "application/json" },
    types: USERS_PICTURES_TYPES
  }
});

export const getUsersFavorites = userId => ({
  [RSAA]: {
    endpoint: `/api/favorites/${userId}?sort=name`,
    method: "GET",
    headers: { "Content-Type": "application/json" },
    bailout: state => {
      const hasPictures = !!state.user.usersFavorites.length;
      return hasPictures;
    },
    types: USERS_FAVORITES_TYPES
  }
});

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

export const fetchUserProfileActionCreators = createActions({
  [reducerName]: {
    FETCH_USER_PROFILE_REQUEST: undefined,
    FETCH_USER_PROFILE_SUCCESS: data => ({ data }),
    FETCH_USER_PROFILE_FAIL: err => ({ err })
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

export const clearCurrentSomeUser = createAction(
  `${reducerName}/CLEAR_CURRENT_SOME_USER`
);

export const incrementUnreadAmount = createAction(
  `${reducerName}/INCREMENT_UNREAD_AMOUNT`
);

export const decrementUnreadAmount = createAction(
  `${reducerName}/DECREMENT_UNREAD_AMOUNT`
);

const userFetchDataAPI = url => () => async dispatch =>
  createDispatchAPIFlow(url, dispatch, fetchInfoActionCreators);

const fetchMyPicturesAPI = url => () => async dispatch =>
  createDispatchAPIFlow(url, dispatch, fetchMyPicturesActionCreators);

const userFetchProfileAPI = url => (id, page) => async dispatch =>
  createDispatchAPIFlow(
    url(id, page),
    dispatch,
    fetchUserProfileActionCreators
  );

//fetchMyUserInfo
export const fetchUserInfo = userFetchDataAPI(userAPI.fetchUserInfo);
export const fetchUserProfile = userFetchProfileAPI(userAPI.fetchUserProfile);
export const fetchMyPictures = fetchMyPicturesAPI(userAPI.fetchMyPictures);
