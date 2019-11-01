import React, { useEffect } from "react";
import ConditionalImage from "../../lib/images/ConditionalImage";
import Spinner from "../../lib/loadings/Spinner";
import UserInfo from "./UserInfo";
import { useSelector } from "react-redux";

import {
  selectCurrentPicture,
  selectIsLoading
} from "../../actions/pictureSelectors";

import { selectIsFavorite } from "../../actions/pictureSelectors";
import PictureInfo from "./PictureInfo";

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

  const fullSizedImagePath = imagePaths[0].path;

  return (
    <div className="full-picture">
      <section className="wrapper">
        <PictureInfo isFavorite={isFavorite} picture={picture} />
        <UserInfo author={author} />
      </section>
      <div className="image-wrapper">
        <ConditionalImage src={fullSizedImagePath} />
      </div>
    </div>
  );
}

export default FullPicture;
