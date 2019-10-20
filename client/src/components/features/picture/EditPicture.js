import React, { useState } from "react";
import Button from "../../lib/buttons/Button";
import ConditionalImage from "../../lib/images/ConditionalImage";
import useRedirect from "../../lib/hooks/useRedirect";
import { useDispatch } from "react-redux";
import { removePicture } from "../../actions/picture";
import EditPictureForm from "./EditPictureForm";
import Dialog from "../../lib/messages/Dialog";

const EditPicture = ({ picture }) => {
  const { redirectTo, renderRedirect } = useRedirect();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const { imagePaths } = picture;

  function redirectToFullPicture() {
    redirectTo(`/pictures/${picture._id}`);
  }

  const handleRemove = () => {
    setShowModal(true);
  };

  const removePictureCall = () => {
    dispatch(removePicture(picture._id));
  };

  return (
    <>
      {renderRedirect()}
      <div className="edit-picture">
        <div className="picture" onClick={redirectToFullPicture}>
          {imagePaths[0].path && <ConditionalImage src={imagePaths[0].path} />}
        </div>
        <section className="edit-actions">
          <EditPictureForm picture={picture}>
            <Button className="btn-texted" handleClick={handleRemove}>
              remove picture
            </Button>
          </EditPictureForm>

          {showModal && (
            <Dialog
              buttonNames={{
                confirm: "remove",
                cancel: "cancel"
              }}
              status={showModal}
              handleShow={status => setShowModal(status)}
              action={removePictureCall}
              title="remove this picture?"
              message="this will delete picture and you would not recover it"
            />
          )}
        </section>
      </div>
    </>
  );
};

export default EditPicture;
