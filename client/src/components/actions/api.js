import { api } from "../../setupEnv";

export const pictureAPI = {
  uploadPicture: `${api}/pictures`,
  fetchPictures: page =>
    `${api}/pictures?include=name,author,imagePaths&sort=favAmount&page=${page}&limit=10`,
  removePicture: id => `${api}/pictures/${id}`,
  fetchOnePicture: id => `${api}/pictures/${id}`,
  updatePicture: id => `${api}/pictures/${id}`,
  fetchFavorites: `${api}/users/me/favorites`,
  addFavorite: id => `${api}/users/me/favorite/${id}`,
  removeFavorite: id => `${api}/users/me/unfavorite/${id}`
};

export const userAPI = {
  fetchUserInfo: `${api}/users/me`,
  fetchUserProfile: id => `${api}/users/${id}`,
  fetchMyPictures: `${api}/users/me/pictures`
};

//in future
//get -> pictures?author=userId //pictures of some user

//get -> favorites/?user=user_id & sort=created_at

// post -> auth/token   /create-new-token ??
// patch -> auth/verification  /verify-user-email

// patch -> users

// get -> users/me/collections  /logged
// get -> users/me/collections?name=collection_name  /logged

// post -> collections  /logged
// patch -> collections/:collection_id   /logged
// delete -> collections/:collection_id  /logged
// get -> collections?user=user_id
// get -> collections?user=user_id & sort=picture_amount
// get -> collections?user=user_id & fields=imagePreviw, name

// patch -> users/follow/:user_id    /logged
// delete -> users/unfollow/:user_id   /logged
// get -> users/me/followings list of my following
// get -> followings/:userId list of followers of some user

// get -> users/me/followers list of my followers
// get -> followers/:userId list of followers of some user

//api for mails, messages, comments
