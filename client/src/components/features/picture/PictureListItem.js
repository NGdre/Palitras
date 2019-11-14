import React from "react";
import PropTypes from "prop-types";
import ImageBarInfo from "./ImageBarInfo";
import useRedirect from "../../hooks/useRedirect";
import PictureActionsContainer from "./PictureActionsContainer";

const PictureListItem = React.memo(({ picture, isFavorite, ...props }) => {
  const { redirectTo, renderRedirect } = useRedirect();

  function redirectToFullPicture() {
    redirectTo(`/pictures/${picture._id}`);
  }

  const author = picture.author || props.author;

  return (
    <>
      {renderRedirect()}
      <li className="image-item">
        <img
          src={picture.imagePaths[1].path}
          className="img"
          alt={picture.name}
          onClick={redirectToFullPicture}
        />
        <div className="image-bar">
          <ImageBarInfo author={author} picture={picture} />
          <div className="image-actions">
            <PictureActionsContainer
              isFavorite={isFavorite}
              picture={picture}
              isIcons={true}
            />
          </div>
        </div>
      </li>
    </>
  );
});

PictureListItem.propTypes = {
  picture: PropTypes.shape({
    imagePath: PropTypes.string,
    name: PropTypes.string,
    author: PropTypes.object,
    _id: PropTypes.string
  }).isRequired
};

export default PictureListItem;
