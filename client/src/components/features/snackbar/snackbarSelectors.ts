interface SnackbarSelector {
  snackbar: {
    message: string;
    open: boolean;
  };
}

export const selectSnackbarMessage = (state: SnackbarSelector) =>
  state.snackbar.message;

export const selectSnackbarOpen = (state: SnackbarSelector) =>
  state.snackbar.open;
