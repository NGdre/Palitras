import { api } from "../../setupEnv";

export const pictureAPI = {
  uploadPicture: `${api}/upload-picture`,
  fetchPictures: `${api}/get-pictures`,
  fetchFavorites: `${api}/get-favorites`,
  fetchOnePicture: id => `${api}/get-picture/${id}`,
  addFavorite: id => `${api}/add-favorite/${id}`,
  removeFavorite: id => `${api}/remove-favorite/${id}`,
  removePicture: id => `${api}/remove-picture/${id}`,
  updatePicture: id => `${api}/update-picture/${id}`
};

export const userAPI = {
  fetchUserInfo: `${api}/user-info`,
  fetchUserProfile: id => `${api}/get-user/${id}`,
  fetchMyPictures: `${api}/get-my-pictures`
};
