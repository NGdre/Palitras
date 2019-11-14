import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { fetchFavorites } from "../../actions/picture";
import { selectFavorites } from "../../actions/pictureSelectors";
import PictureListContainer from "../picture/PictureListContainer";

const Favorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  const isFavorite = React.useCallback(() => true, []);

  return (
    <>
      <Helmet>
        <title>My Favorites | Palitras</title>
      </Helmet>
      <div className="container">
        <PictureListContainer
          pictures={favorites}
          isFavorite={isFavorite}
          from="picture"
        />
      </div>
    </>
  );
};

export default Favorites;
