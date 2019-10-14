import React, { useEffect } from "react";
import ConditionalImage from "../../lib/images/ConditionalImage";
import Spinner from "../../lib/loadings/Spinner";
import UserInfo from "./UserInfo";
import { useSelector } from "react-redux";
import PictureInfo from "./PictureInfo";
import { selectCurrentPicture } from "../../actions/pictureSelectors";
import useChangeTitle from "../../lib/hooks/useChangeTitle";

function FullPicture({ fetchOnePicture }) {
  const picture = useSelector(selectCurrentPicture);
  const { imagePath } = picture;

  useEffect(() => {
    fetchOnePicture();
  }, [fetchOnePicture]);

  useChangeTitle({ addTitle: picture.name });

  if (!picture.name) {
    return <Spinner />;
  }

  const { author } = picture;

  return (
    <div className="full-picture">
      <section className="wrapper">
        <PictureInfo picture={picture} />
        <UserInfo author={author} />
      </section>
      {imagePath && <ConditionalImage src={imagePath} />}
    </div>
  );
}

export default FullPicture;
