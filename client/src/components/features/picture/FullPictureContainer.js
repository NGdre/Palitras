import React from "react";
import FullPicture from "./FullPicture";
import { connect } from "react-redux";
import { fetchOnePicture } from "../../actions/picture";

function FullPictureContainer(props) {
  return <FullPicture {...props} />;
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const { id } = ownProps.match.params;
  return {
    fetchOnePicture: () => dispatch(fetchOnePicture(id))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(FullPictureContainer);
