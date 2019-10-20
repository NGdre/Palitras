import React from "react";
import PictureList from "./PictureList";
import Spinner from "../../lib/loadings/Spinner";
import useSpinner from "../../lib/hooks/useSpinner";

const PictureListContainer = ({
  pictures = [],
  favorites,
  myPictures,
  author,
  from
}) => {
  const { isLoading } = useSpinner({ from });

  if (isLoading) {
    return <Spinner />;
  }

  if (isLoading === false && !pictures.length) {
    return <p>there is no pictures added here</p>;
  }

  const isFavorite = picture => {
    if (!favorites) {
      return false;
    }
    return favorites === true || favorites.indexOf(picture._id) > -1;
  };

  return (
    <PictureList
      pictures={pictures}
      isFavorite={isFavorite}
      myPictures={myPictures}
      author={author}
    />
  );
};

export default PictureListContainer;
