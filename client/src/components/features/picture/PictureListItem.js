import React from "react";
import PropTypes from "prop-types";
import ButtonIcon from "../../lib/buttons/ButtonIcon";
import { useSpring, animated } from "react-spring";
import useFavorite from "../../lib/hooks/useFavorite";
import useRedirect from "../../lib/hooks/useRedirect";

const PictureListItem = React.memo(({ picture, isFavorite }) => {
  const { redirectTo, renderRedirect } = useRedirect();
  const animationProps = useSpring({ opacity: 1, from: { opacity: 0 } });

  const { handleFavorites, isAddedInFavorites } = useFavorite(
    isFavorite,
    picture
  );

  function redirectToFullPicture() {
    redirectTo(`/pictures/${picture._id}`);
  }

  const handleCollection = () => {
    console.log("hey", picture._id);
  };

  const { author } = picture;

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
        <div className="image-info">
          <div>
            <p className="image-name">{picture.name}</p>
            <p className="author-name">
              author: <i>{author.username}</i>
            </p>
          </div>
          <div className="image-actions">
            <ButtonIcon
              iconName={isAddedInFavorites ? "favorite" : "favorite_bordered"}
              handleClick={handleFavorites}
            />
            <ButtonIcon
              iconName="playlist_add"
              handleClick={handleCollection}
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
