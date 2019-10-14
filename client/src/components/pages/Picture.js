import React from "react";
import FullPictureContainer from "../features/picture/FullPictureContainer";

function Picture(props) {
  return (
    <div className="container">
      <FullPictureContainer {...props} />
    </div>
  );
}

export default Picture;
