import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { fetchFavorites } from "../actions/picture";
import { selectFavorites } from "../actions/pictureSelectors";
import PictureListContainer from "../features/picture/PictureListContainer";

const Favorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>My Favorites | Palitras</title>
      </Helmet>
      <div className="container">
        <PictureListContainer
          pictures={favorites}
          favorites={true}
          from="picture"
        />
      </div>
    </>
  );
};

export default Favorites;
