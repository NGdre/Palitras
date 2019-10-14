import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PictureList from "../features/picture/PictureList";
import { fetchFavorites } from "../actions/picture";
import { selectFavorites } from "../actions/pictureSelectors";

const Favorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  return (
    <div className="container">
      <PictureList pictures={favorites} favorites={true} />
    </div>
  );
};

export default Favorites;
