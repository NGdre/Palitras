import React from "react";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { selectPicturesName } from "../actions/pictureSelectors";
import FullPictureContainer from "../features/picture/FullPictureContainer";

function Picture(props) {
  const picturesName = useSelector(selectPicturesName);

  return (
    <>
      <Helmet>
        <title>{`${picturesName || "Home"} | Palitras`}</title>
      </Helmet>
      <div className="container">
        <FullPictureContainer {...props} />
      </div>
    </>
  );
}

export default Picture;
