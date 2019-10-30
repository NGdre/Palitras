import React from "react";
import { Helmet } from "react-helmet";
import PictureFormContainer from "../features/adding-picture/PictureFormContainer";

function AddPicture() {
  return (
    <>
      <Helmet>
        <title>Add Picture | Palitras</title>
      </Helmet>

      <PictureFormContainer />
    </>
  );
}

export default AddPicture;
