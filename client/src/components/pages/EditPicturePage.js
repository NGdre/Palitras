import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { selectEditPicture, selectMyPictures } from "../actions/userSelectors";
import { fetchMyPictures } from "../actions/user";
import EditPicture from "../features/picture/EditPicture";
import Spinner from "../lib/loadings/Spinner";

function EditPicturePage(props) {
  const picture = useSelector(selectEditPicture);
  const pictures = useSelector(selectMyPictures);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!picture.name) {
      dispatch(fetchMyPictures());
    }
  }, [picture.name, dispatch]);

  const getPicture = () => {
    return !picture.name
      ? pictures.find(x => x._id === props.match.params.id)
      : picture;
  };

  return (
    <>
      <Helmet>
        <title>Edit My Picture | Palitras</title>
      </Helmet>
      <div className="container">
        {getPicture() ? <EditPicture picture={getPicture()} /> : <Spinner />}
      </div>
    </>
  );
}

export default withRouter(EditPicturePage);
