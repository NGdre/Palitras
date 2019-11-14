import { useState } from "react";
import { useDispatch } from "react-redux";
import { addFavorite, removeFavorite } from "../actions/picture";
import {
  addPictureInFavorites,
  removePictureFromFavorites
} from "../actions/user";

export default function useFavorite(initialValue, picture) {
  const [isAddedInFavorites, setFavorite] = useState(initialValue);
  const dispatch = useDispatch();

  //refactor this
  const handleFavorites = () => {
    const id = picture._id;
    if (isAddedInFavorites) {
      dispatch(removeFavorite(id));
      dispatch(removePictureFromFavorites(id));
    } else {
      dispatch(addPictureInFavorites(id));
      dispatch(addFavorite(id));
    }
    setFavorite(!isAddedInFavorites);
  };

  return {
    handleFavorites,
    isAddedInFavorites
  };
}
