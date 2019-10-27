import { handleActions, combineActions } from "redux-actions";
import {
  fetchInfoActionCreators,
  fetchUserProfileActionCreators,
  fetchMyPicturesActionCreators,
  USERS_FAVORITES_TYPES,
  USERS_PICTURES_TYPES
} from "../actions/user";

import { getActionsOfType } from "../lib/utils/actionHelpers";
import { combineAPIActions } from "../lib/utils/";

const { actionRequests, actionFails } = getActionsOfType(
  [
    fetchInfoActionCreators,
    fetchMyPicturesActionCreators,
    fetchUserProfileActionCreators
  ],
  {
    reducerName: "user"
  }
);

const initialState = {
  message: null,
  userInfo: {},
  someUser: {},
  usersPictures: [],
  usersFavorites: [],
  myPictures: [],
  editPicture: {}
};

export const userReducer = handleActions(
  {
    [combineActions(...actionRequests)]: state => ({
      ...state,
      isLoading: true
    }),

    [combineActions(...actionFails)]: (state, action) => ({
      ...state,
      message: action.payload.err,
      isLoading: false
    }),

    ...combineAPIActions(
      [USERS_PICTURES_TYPES[0], USERS_FAVORITES_TYPES[0]],
      state => ({
        ...state,
        isLoading: true
      })
    ),

    ...combineAPIActions(
      [USERS_PICTURES_TYPES[2], USERS_FAVORITES_TYPES[2]],
      (state, action) => ({
        ...state,
        message: action.payload,
        isLoading: false
      })
    ),

    user: {
      FETCH_INFO_SUCCESS: (state, { payload }) => ({
        ...state,
        userInfo: payload.data,
        isLoading: false
      }),

      FETCH_USER_PROFILE_SUCCESS: (state, { payload }) => ({
        ...state,
        someUser: payload.data,
        isLoading: false
      }),

      USERS_PICTURES_SUCCESS: (state, { payload }) => ({
        ...state,
        usersPictures: payload,
        isLoading: false
      }),

      USERS_FAVORITES_SUCCESS: (state, { payload }) => ({
        ...state,
        usersFavorites: payload,
        isLoading: false
      }),

      FETCH_MY_PICTURES_SUCCESS: (state, { payload }) => ({
        ...state,
        myPictures: payload.data,
        isLoading: false
      }),

      ADD_PICTURE_IN_FAVORITES: (state, action) => {
        const { pictureId } = action.payload;
        const { favorites } = state.userInfo;

        return {
          ...state,
          userInfo: {
            ...state.userInfo,
            favorites: [...favorites, pictureId]
          }
        };
      },

      REMOVE_PICTURE_FROM_FAVORITES: (state, action) => {
        const { pictureId } = action.payload;
        const { favorites } = state.userInfo;

        return {
          ...state,
          userInfo: {
            ...state.userInfo,
            favorites: favorites.filter(x => x !== pictureId)
          }
        };
      },

      SET_EDIT_PICTURE: (state, { payload }) => ({
        ...state,
        editPicture: state.myPictures.find(x => x._id === payload.pictureId)
      })
    }
  },
  initialState
);
