import React from "react";

import PictureListMyItem from "./PictureListMyItem";
import PictureListItem from "./PictureListItem";

const ImageStrategy = ({ picture, isFavorite, myPictures, author }) => {
  if (myPictures) {
    return <PictureListMyItem picture={picture} />;
  }

  return (
    <PictureListItem
      author={author}
      picture={picture}
      isFavorite={isFavorite(picture)}
    />
  );
};

function PictureList({
  pictures = [],
  isFavorite,
  myPictures = false,
  author
}) {
  return (
    <section className="picture-list">
      <ul className="image-list">
        {pictures.map(picture => {
          return (
            <ImageStrategy
              author={author}
              picture={picture}
              isFavorite={isFavorite}
              key={picture._id}
              myPictures={myPictures}
            />
          );
        })}
      </ul>
    </section>
  );
}

export default PictureList;
