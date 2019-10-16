export const selectFavoritesId = state => state.user.userInfo.favorites;
export const selectMessage = state => state.picture.message.text;
export const selectShowMessage = state => state.picture.message.snackBar;
export const selectPictures = state => state.picture.pictures;
export const selectCurrentPicture = state => state.picture.currentPicture;

export const selectIsFavorite = state => {
  const favorites = selectFavoritesId(state);
  const current = selectCurrentPicture(state);
  return !!favorites && favorites.indexOf(current._id) > -1;
};

export const selectFavorites = state => state.picture.favorites;
export const selectIsLoading = state => state.picture.isLoading;
