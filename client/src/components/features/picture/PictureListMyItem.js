import React from "react";
import { useDispatch } from "react-redux";
import { setEditPicture } from "../../actions/user";
import PropTypes from "prop-types";
import ButtonIcon from "../../lib/buttons/ButtonIcon";
import { useSpring, animated } from "react-spring";
import useRedirect from "../../lib/hooks/useRedirect";

const PictureListMyItem = React.memo(({ picture }) => {
  const { redirectTo, renderRedirect } = useRedirect();
  const dispatch = useDispatch();

  const animationProps = useSpring({ opacity: 1, from: { opacity: 0 } }); // similar

  function redirectToFullPicture() {
    redirectTo(`/pictures/${picture._id}`);
  }

  function redirectToEditPicture() {
    redirectTo(`/edit-picture/${picture._id}`);
    dispatch(setEditPicture(picture._id));
  }

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
          <p className="image-name">{picture.name}</p>

          <div className="image-actions">
            <ButtonIcon iconName="edit" handleClick={redirectToEditPicture} />
          </div>
        </div>
      </animated.li>
    </>
  );
});

PictureListMyItem.propTypes = {
  // similar
  picture: PropTypes.shape({
    imagePath: PropTypes.string,
    name: PropTypes.string,
    _id: PropTypes.string
  }).isRequired
};

export default PictureListMyItem;
