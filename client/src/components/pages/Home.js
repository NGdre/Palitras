import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import qs from "qs";
import { fetchPictures } from "../actions/picture";
import {
  selectFavoritesId,
  selectPictures,
  selectPicturesTotalPages,
  selectPicturesTotalImages
} from "../actions/pictureSelectors";

import PictureListContainer from "../features/picture/PictureListContainer";
import Pagination from "../lib/pagination/Pagination";

function Home() {
  const dispatch = useDispatch();
  const favoritesId = useSelector(selectFavoritesId);
  const pictures = useSelector(selectPictures);
  const picturesTotalPages = useSelector(selectPicturesTotalPages);
  const picturesTotalImages = useSelector(selectPicturesTotalImages);

  const search = useSelector(state => {
    return state.router.location.search;
  });

  const defaultPage = +qs.parse(search.slice(1)).page;

  const fetchPage = React.useCallback(
    page => {
      dispatch(fetchPictures(page));
    },
    [dispatch]
  );

  return (
    <>
      <Helmet>
        <title>Home | Palitras</title>
      </Helmet>
      <div className="container">
        <PictureListContainer
          pictures={pictures}
          favorites={favoritesId}
          from="picture"
        />
        <Pagination
          fetchPage={fetchPage}
          defaultPage={defaultPage}
          totalPages={picturesTotalPages}
          totalImages={picturesTotalImages}
        />
      </div>
    </>
  );
}

export default Home;
