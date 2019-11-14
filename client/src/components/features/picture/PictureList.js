import React from "react";
import { a, useTransition } from "react-spring";
import PictureListMyItem from "./PictureListMyItem";
import PictureListItem from "./PictureListItem";
import _ from "lodash";

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
  const chunkedPictures = _.chunk(pictures, 3);

  const transitions = useTransition(pictures, picture => picture._id, {
    config: {
      tension: 180,
      friction: 40
    },
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    trail: 50
  });

  return (
    <section className="picture-list">
      <ul className="image-list">
        {transitions.map(({ item: picture, props, key }) => {
          return (
            <a.div style={props} key={key}>
              <ImageStrategy
                author={author}
                picture={picture}
                isFavorite={isFavorite}
                key={picture._id}
                myPictures={myPictures}
              />
            </a.div>
          );
        })}
      </ul>
    </section>
  );
}

export default PictureList;
