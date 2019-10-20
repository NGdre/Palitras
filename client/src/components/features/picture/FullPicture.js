import React, { useEffect } from "react";
import ConditionalImage from "../../lib/images/ConditionalImage";
import Spinner from "../../lib/loadings/Spinner";
import UserInfo from "./UserInfo";
import { useSelector } from "react-redux";
import PictureInfo from "./PictureInfo";
import {
  selectCurrentPicture,
  selectIsLoading
} from "../../actions/pictureSelectors";
import useChangeTitle from "../../lib/hooks/useChangeTitle";

function FullPicture({ fetchOnePicture }) {
  const picture = useSelector(selectCurrentPicture);
  const IsPictureLoading = useSelector(selectIsLoading);
  const { imagePaths } = picture;

  useEffect(() => {
    fetchOnePicture();
  }, [fetchOnePicture]);

  useChangeTitle({ addTitle: picture.name });

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
        <PictureInfo picture={picture} />
        <UserInfo author={author} />
      </section>
      <div className="image-wrapper">
        {imagePaths[0].path && <ConditionalImage src={imagePaths[0].path} />}
      </div>
    </div>
  );
}

export default FullPicture;
