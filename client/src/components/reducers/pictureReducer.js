import { handleActions, combineActions } from "redux-actions";
import {
  fetchImagesActionCreators,
  fetchPictureActionCreators,
  uploadPictureActionCreators,
  fetchFavoritesActionCreators,
  removePictureActionCreators,
  updatePictureActionCreators
} from "../actions/picture";

import { getActionsOfType } from "../lib/utils/actionHelpers";

const initialState = {
  message: {
    text: null,
    snackBar: false
  },
  pictures: [],
  currentPicture: {},
  favorites: []
};

const { actionRequests, actionFails } = getActionsOfType(
  [
    fetchImagesActionCreators,
    fetchPictureActionCreators,
    uploadPictureActionCreators,
    fetchFavoritesActionCreators,
    removePictureActionCreators,
    updatePictureActionCreators
  ],
  {
    reducerName: "picture"
  }
);

export const pictureReducer = handleActions(
  {
    [combineActions(...actionRequests)]: state => ({
      ...state,
      isLoading: true
    }),

    [combineActions(...actionFails)]: (state, action) => ({
      ...state,
      message: {
        text: action.payload.err.message
      },
      isLoading: false
    }),

    picture: {
      FETCH_IMAGES_SUCCESS: (state, action) => ({
        ...state,
        pictures: action.payload.data,
        isLoading: false
      }),

      FETCH_FAVORITES_SUCCESS: (state, action) => ({
        ...state,
        favorites: action.payload.data,
        isLoading: false
      }),

      FETCH_PICTURE_SUCCESS: (state, action) => ({
        ...state,
        currentPicture: action.payload.data,
        isLoading: false
      }),

      UPLOAD_PICTURE_SUCCESS: (state, { payload }) => ({
        ...state,
        message: {
          text: payload.data.message,
          snackBar: true
        },
        isLoading: false
      }),

      ADD_FAVORITE_SUCCESS: (state, { payload }) => {
        const { currentPicture } = state;

        const defaultState = {
          ...state,
          message: { text: payload.data.message, snackBar: true },
          isLoading: false
        };

        if (currentPicture.name) {
          return {
            ...defaultState,
            currentPicture: {
              ...currentPicture,
              favAmount: currentPicture.favAmount + 1
            }
          };
        }

        return defaultState;
      },

      REMOVE_FAVORITE_SUCCESS: (state, { payload }) => {
        const { currentPicture } = state;

        const defaultState = {
          ...state,
          message: { text: payload.data.message, snackBar: true },
          isLoading: false
        };

        if (currentPicture.name) {
          return {
            ...defaultState,
            currentPicture: {
              ...currentPicture,
              favAmount: currentPicture.favAmount - 1
            }
          };
        }

        return defaultState;
      },

      CLEAR_CURRENT_PICTURE: state => ({
        ...state,
        currentPicture: {}
      }),

      REMOVE_PICTURE_SUCCESS: (state, { payload }) => ({
        ...state,
        message: {
          text: payload.data.message,
          snackBar: true
        }
      }),

      UPDATE_PICTURE_SUCCESS: (state, { payload }) => ({
        ...state,
        message: {
          text: payload.data.message,
          snackBar: false
        }
      })
    }
  },
  initialState
);
