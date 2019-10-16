import React from "react";
import { useSelector } from "react-redux";
import { selectIsLoading } from "../../actions/pictureSelectors";
import PictureListItem from "./PictureListItem";
import Spinner from "../../lib/loadings/Spinner";
import PictureListMyItem from "./PictureListMyItem";

function PictureList({ pictures, favorites }) {
  const IsPicturesLoading = useSelector(selectIsLoading);

  if (IsPicturesLoading !== false) {
    return <Spinner />;
  }

  if (IsPicturesLoading === false && !pictures.length) {
    return <p>there is no pictures added here</p>;
  }

  const isFavorite = picture => {
    return favorites === true || favorites.indexOf(picture._id) > -1;
  };

  return (
    <section className="picture-list">
      <ul className="image-list">
        {pictures.map(picture => {
          return favorites ? (
            <PictureListItem
              picture={picture}
              key={picture._id}
              isFavorite={isFavorite(picture)}
            />
          ) : (
            <PictureListMyItem picture={picture} key={picture._id} />
          );
        })}
      </ul>
    </section>
  );
}

export default PictureList;
