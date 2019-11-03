export const selectUserInfo = state => state.user.userInfo;
export const selectUserProfile = state => state.user.someUser;
export const selectMyPictures = state => state.user.myPictures;
export const selectUsersPictures = state => state.user.usersPictures;
export const selectUsersFavorites = state => state.user.usersFavorites;
export const selectEditPicture = state => state.user.editPicture;
export const selectIsLoading = state => state.user.isLoading;
export const selectUsernameOfUser = state => state.user.someUser.username;
export const selectEmailOfUser = state => state.user.someUser.email;
export const selectNotifications = state =>
  state.user.userInfo.notifications.docs;
export const selectUnreadNotifications = state => {
  return state.user.userInfo.notifications.docs.filter(
    notification => notification.is_read
  );
};
export const selectReadNotifications = state => {
  return state.user.userInfo.notifications.docs.filter(
    notification => !notification.is_read
  );
};
