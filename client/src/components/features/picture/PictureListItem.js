import React from "react";
import PropTypes from "prop-types";
import ButtonIcon from "../../lib/buttons/ButtonIcon";
import { useSpring, animated } from "react-spring";
import useRedirect from "../../lib/hooks/useRedirect";

const PictureListItem = React.memo(
  ({
    picture,
    isFavorite,
    handleCollections,
    handleFavorites,
    isAddedInFavorites,
    ...props
  }) => {
    const { redirectTo, renderRedirect } = useRedirect();
    const animationProps = useSpring({ opacity: 1, from: { opacity: 0 } });

    function redirectToFullPicture() {
      redirectTo(`/pictures/${picture._id}`);
    }

    function redirectToUserProfile() {
      redirectTo(`/users/${picture.author._id}/?tab=latest`);
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
            <div className="image-info">
              <p className="image-name">{picture.name}</p>
              <p className="author-name-wrapper">
                author:{" "}
                <i className="author-name" onClick={redirectToUserProfile}>
                  {author.username}
                </i>
              </p>
            </div>
            <div className="image-actions">
              <ButtonIcon
                iconName={isAddedInFavorites ? "favorite" : "favorite_bordered"}
                handleClick={handleFavorites}
              />
              <ButtonIcon
                iconName="playlist_add"
                handleClick={handleCollections}
              />
            </div>
          </div>
        </animated.li>
      </>
    );
  }
);

PictureListItem.propTypes = {
  picture: PropTypes.shape({
    imagePath: PropTypes.string,
    name: PropTypes.string,
    author: PropTypes.object,
    _id: PropTypes.string
  }).isRequired
};

export default PictureListItem;
