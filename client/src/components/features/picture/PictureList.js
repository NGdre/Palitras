import React from "react";

import PictureListItem from "./PictureListItem";

import PictureListMyItem from "./PictureListMyItem";

function PictureList({
  pictures = [],
  isFavorite,
  myPictures = false,
  author = {}
}) {
  return (
    <section className="picture-list">
      <ul className="image-list">
        {pictures.map(picture => {
          return !myPictures ? (
            <PictureListItem
              picture={picture}
              author={author}
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
