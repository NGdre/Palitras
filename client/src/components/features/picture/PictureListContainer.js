import React from "react";
import PictureList from "./PictureList";
import Spinner from "../../loadings/Spinner";
import useSpinner from "../../hooks/useSpinner";

const PictureListContainer = ({
  pictures = [],
  isFavorite = false,
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

  const returnFalse = () => false;

  return (
    <PictureList
      pictures={pictures}
      isFavorite={isFavorite || returnFalse}
      myPictures={myPictures}
      author={author}
    />
  );
};

export default PictureListContainer;
