import React from "react";
import PropTypes from "prop-types";
import { useSpring, animated } from "react-spring";
import ImageBarInfo from "./ImageBarInfo";
import useRedirect from "../../lib/hooks/useRedirect";
import PictureActionsContainer from "./PictureActionsContainer";

const PictureListItem = React.memo(({ picture, isFavorite, ...props }) => {
  const { redirectTo, renderRedirect } = useRedirect();
  const animationProps = useSpring({ opacity: 1, from: { opacity: 0 } });

  function redirectToFullPicture() {
    redirectTo(`/pictures/${picture._id}`);
  }

  const author = picture.author || props.author;

  return (
    <>
      {renderRedirect()}
      <animated.li className="image-item" style={animationProps}>
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
      </animated.li>
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
