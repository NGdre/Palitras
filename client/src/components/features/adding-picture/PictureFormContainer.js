import React from "react";
import { connect } from "react-redux";
import PictureForm from "./PictureForm";
import { uploadPicture } from "../../actions/picture";

function PictureFormContainer(props) {
  return <PictureForm {...props} />;
}

const mapDispatchToProps = dispatch => {
  return {
    sendFetchRequest: data => dispatch(uploadPicture(data))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(PictureFormContainer);
