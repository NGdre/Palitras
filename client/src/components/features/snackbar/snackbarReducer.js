import { handleActions } from "redux-actions";

const initialState = {
  message: "",
  open: false
};

export const snackbarReducer = handleActions(
  {
    snackbar: {
      SET_SNACKBAR_MESSAGE: (state, { payload: { message } }) => ({
        message,
        open: true
      }),

      CLEAR_SNACKBAR: () => ({
        message: "",
        open: false
      })
    }
  },
  initialState
);
