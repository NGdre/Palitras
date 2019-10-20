import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPictures } from "../actions/picture";
import { selectFavoritesId, selectPictures } from "../actions/pictureSelectors";
import PictureListContainer from "../features/picture/PictureListContainer";

function Home() {
  const dispatch = useDispatch();
  const favoritesId = useSelector(selectFavoritesId);
  const pictures = useSelector(selectPictures);

  useEffect(() => {
    dispatch(fetchPictures());
  }, [dispatch]);

  return (
    <div className="container">
      <PictureListContainer
        pictures={pictures}
        favorites={favoritesId}
        from="picture"
      />
      ;
    </div>
  );
}

export default Home;
