import React from "react";
import Button from "../../lib/buttons/Button";
import useFavorite from "../../lib/hooks/useFavorite";
import { useSelector } from "react-redux";

import { selectIsFavorite } from "../../actions/pictureSelectors";

import { parseMongoDate } from "../../lib/utils/";

function PictureInfo({ picture }) {
  const isFavorite = useSelector(selectIsFavorite);

  const { handleFavorites, isAddedInFavorites } = useFavorite(
    isFavorite,
    picture
  );

  const handleCollections = () => {
    console.log("this is doesn't work yet");
  };

  return (
    <>
      <section className="picture-section">
        <div className="picture-actions">
          <Button className="btn-texted" handleClick={handleFavorites}>
            <i className="material-icons">
              {isAddedInFavorites ? "favorite" : "favorite_bordered"}
            </i>
            {picture.favAmount} {picture.favAmount === 1 ? "like" : "likes"}
          </Button>
          <Button className="btn-texted" handleClick={handleCollections}>
            <i className="material-icons">playlist_add</i>
            add in collection
          </Button>
        </div>
        <div className="picture-info">
          {/* <p className="picture-views">views: 1 {picture.views}</p> */}
          <p className="picture-name">
            name: <strong>{picture.name}</strong>{" "}
          </p>
          <p className="picture-date">
            uploaded at:{" "}
            <span className="date">{parseMongoDate(picture.createdAt)}</span>
          </p>
        </div>
      </section>
    </>
  );
}

export default PictureInfo;
