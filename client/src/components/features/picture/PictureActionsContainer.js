import React from "react";
import useFavorite from "../../hooks/useFavorite";
import useIsLogged from "../../hooks/useIsLogged";
import _ from "lodash";
import PictureActions from "./PictureActions";

export default function PictureActionsContainer({
  picture,
  isFavorite,
  ...props
}) {
  const { handleFavorites, isAddedInFavorites } = useFavorite(
    isFavorite,
    picture
  );

  const handleFavoritesWithValidation = useIsLogged(
    _.debounce(handleFavorites, 500)
  );

  const handleCollections = () => {
    console.log("this is doesn't work yet");
  };

  return (
    <PictureActions
      {...props}
      picture={picture}
      handleCollections={_.throttle(handleCollections, 2000)}
      handleFavorites={handleFavoritesWithValidation}
      isAddedInFavorites={isAddedInFavorites}
      favAmount={picture.favAmount}
    />
  );
}
