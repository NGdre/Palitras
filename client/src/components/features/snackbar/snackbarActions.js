import { createActions } from "redux-actions";

const moduleName = "snackbar";

export const snackbarActions = createActions({
  [moduleName]: {
    SET_SNACKBAR_MESSAGE: message => ({ message }),
    CLEAR_SNACKBAR: undefined
  }
});

const { snackbar } = snackbarActions;

export const { setSnackbarMessage } = snackbar;
export const { clearSnackbar } = snackbar;
