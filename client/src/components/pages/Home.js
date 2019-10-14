import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPictures } from "../actions/picture";
import { selectFavoritesId, selectPictures } from "../actions/pictureSelectors";
import PictureList from "../features/picture/PictureList";

function Home() {
  const dispatch = useDispatch();
  const favoritesId = useSelector(selectFavoritesId);
  const pictures = useSelector(selectPictures);

  useEffect(() => {
    dispatch(fetchPictures());
  }, [dispatch]);

  return (
    <div className="container">
      <PictureList pictures={pictures} favorites={favoritesId} />;
    </div>
  );
}

export default Home;
