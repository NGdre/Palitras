import useFavorite from "../../lib/hooks/useFavorite";
import useIsLogged from "../../lib/hooks/useIsLogged";
import _ from "lodash";

export default function PictureActionsProvider({
  picture,
  isFavorite,
  render,
  ...props
}) {
  const { handleFavorites, isAddedInFavorites } = useFavorite(
    isFavorite,
    picture
  );

  const handleFavoritesWithValidation = useIsLogged(
    _.throttle(handleFavorites, 1000)
  );

  const handleCollections = () => {
    console.log("this is doesn't work yet");
  };

  return render({
    ...props,
    picture,
    handleCollections: _.throttle(handleCollections, 2000),
    handleFavorites: handleFavoritesWithValidation,
    isAddedInFavorites
  });
}
