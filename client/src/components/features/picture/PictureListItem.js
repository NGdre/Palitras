import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";

import ImageBarInfo from "./ImageBarInfo";
import PictureActionsContainer from "./PictureActionsContainer";
import { getSrcSet } from "../../utils";

const PictureListItem = React.memo(({ picture, isFavorite, ...props }) => {
  const dispatch = useDispatch();

  function redirectToFullPicture() {
    dispatch(push(`/pictures/${picture._id}`));
  }

  const author = picture.author || props.author;

  const { imagePaths } = picture;

  return (
    <li className="image-item">
      <img
        sizes="(min-width: 30em) 28em, 100vw"
        srcSet={getSrcSet(imagePaths)}
        src={imagePaths[0].path}
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
  );
});

PictureListItem.propTypes = {
  picture: PropTypes.shape({
    imagePaths: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    author: PropTypes.object,
    _id: PropTypes.string
  }).isRequired
};

export default PictureListItem;
