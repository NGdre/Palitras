import React from "react";
import ButtonIcon from "../../buttons/ButtonIcon";
import Button from "../../buttons/Button";

const PictureActions = ({
  favAmount,
  isAddedInFavorites,
  handleCollections,
  handleFavorites,
  isIcons = false
}) => {
  if (isIcons) {
    return (
      <>
        <ButtonIcon
          iconName={isAddedInFavorites ? "favorite" : "favorite_bordered"}
          handleClick={handleFavorites}
        />
        <ButtonIcon iconName="playlist_add" handleClick={handleCollections} />
      </>
    );
  }

  return (
    <>
      <Button className="btn-texted" handleClick={handleFavorites}>
        <i className="material-icons">
          {isAddedInFavorites ? "favorite" : "favorite_bordered"}
        </i>
        {favAmount} {favAmount === 1 ? "like" : "likes"}
      </Button>
      <Button className="btn-texted" handleClick={handleCollections}>
        <i className="material-icons">playlist_add</i>
        add in collection
      </Button>
    </>
  );
};

export default PictureActions;
