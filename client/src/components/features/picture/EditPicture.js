import React, { useState } from "react";
import Button from "../../lib/buttons/Button";
import ConditionalImage from "../../lib/images/ConditionalImage";
import useRedirect from "../../lib/hooks/useRedirect";
import { useDispatch } from "react-redux";
import { removePicture } from "../../actions/picture";
import EditPictureForm from "./EditPictureForm";
import ModalNotification from "../../lib/messages/ModalNotification";

const EditPicture = ({ picture }) => {
  const { redirectTo, renderRedirect } = useRedirect();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const { imagePath } = picture;

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
          {imagePath && <ConditionalImage src={imagePath} />}
        </div>
        <section className="edit-actions">
          <EditPictureForm picture={picture} />
          <Button className="btn-texted" handleClick={handleRemove}>
            remove picture
          </Button>
          {showModal && (
            <ModalNotification
              status={showModal}
              handleShow={status => setShowModal(status)}
              action={removePictureCall}
              message="are you sure, that you want to delete picture?"
            />
          )}
        </section>
      </div>
    </>
  );
};

export default EditPicture;
