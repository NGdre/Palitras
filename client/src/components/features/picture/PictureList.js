import React from "react";

import PictureListItem from "./PictureListItem";

import PictureListMyItem from "./PictureListMyItem";
import PictureActionsProvider from "./PictureActionsProvider";

function PictureList({
  pictures = [],
  isFavorite,
  myPictures = false,
  author = {}
}) {
  console.log(isFavorite);
  return (
    <section className="picture-list">
      <ul className="image-list">
        {pictures.map(picture => {
          return !myPictures ? (
            <PictureActionsProvider
              picture={picture}
              isFavorite={isFavorite(picture)}
              render={props => <PictureListItem {...props} author={author} />}
              key={picture._id}
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
