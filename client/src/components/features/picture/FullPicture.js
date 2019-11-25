import React, { useEffect } from "react";
import Spinner from "../../loadings/Spinner";
import UserInfo from "./UserInfo";
import { useSelector } from "react-redux";

import {
  selectCurrentPicture,
  selectIsLoading
} from "../../actions/pictureSelectors";

import { selectIsFavorite } from "../../actions/pictureSelectors";
import PictureInfo from "./PictureInfo";
import { getSrcSet } from "../../utils";

function FullPicture({ fetchOnePicture }) {
  const picture = useSelector(selectCurrentPicture);
  const isFavorite = useSelector(selectIsFavorite);
  const IsPictureLoading = useSelector(selectIsLoading);
  const { imagePaths } = picture;

  useEffect(() => {
    fetchOnePicture();
  }, [fetchOnePicture]);

  if (IsPictureLoading !== false) {
    return <Spinner />;
  }

  if (IsPictureLoading === false && !picture.name) {
    return <p>picture was removed</p>;
  }

  const { author } = picture;

  return (
    <div className="full-picture">
      <section className="wrapper">
        <PictureInfo isFavorite={isFavorite} picture={picture} />
        <UserInfo author={author} />
      </section>
      <div className="image-wrapper">
        <img
          sizes="(min-width: 30em) 28em, 100vw"
          srcSet={getSrcSet(imagePaths)}
          src={imagePaths[0].path}
          className="img"
          alt={picture.name}
        />
      </div>
    </div>
  );
}

export default FullPicture;
