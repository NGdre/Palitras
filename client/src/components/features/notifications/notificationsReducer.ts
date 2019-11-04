import { handleActions } from "redux-actions";
import { USERS_NOTIFICATIONS_TYPES } from "./notificationsActions";

import { combineAPIActions } from "../../lib/utils";

interface NotificationsState {
  notifications: {
    ofType: {
      all: [];
      read: [];
      unread: [];
    };
    amount: number;
    readAmount: number;
    unreadAmount: number;
  };
}

interface GetNotificationsSuccess {
  payload: {
    notifications: [];
    read: [];
    unread: [];
    amount: number;
    readAmount: number;
    unreadAmount: number;
  };
}

const initialState = {
  ofType: {
    all: [],
    read: [],
    unread: []
  },
  amount: 0,
  readAmount: 0,
  unreadAmount: 0
};

export const notificationsReducer = handleActions(
  {
    ...combineAPIActions(
      [USERS_NOTIFICATIONS_TYPES[0]],
      (state: NotificationsState) => ({
        ...state,
        isLoading: true
      })
    ),

    ...combineAPIActions(
      [USERS_NOTIFICATIONS_TYPES[0]],
      (
        state: NotificationsState,
        action: { payload: { message: string } }
      ) => ({
        ...state,
        message: action.payload,
        isLoading: false
      })
    ),

    notifications: {
      USERS_NOTIFICATIONS_SUCCESS: (
        state,
        { payload }: GetNotificationsSuccess
      ) => ({
        ...state,
        ofType: {
          ...state.ofType,
          all: payload.notifications,
          read: payload.read,
          unread: payload.unread
        },
        amount: payload.amount,
        readAmount: payload.readAmount,
        unreadAmount: payload.unreadAmount
      })
    }
  },
  initialState
);
