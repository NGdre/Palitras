import React from "react";
import PictureActionsContainer from "./PictureActionsContainer";

import { parseMongoDate } from "../../lib/utils/";

function PictureInfo({ picture, isFavorite }) {
  return (
    <>
      <section className="picture-section">
        <div className="picture-actions">
          <PictureActionsContainer picture={picture} isFavorite={isFavorite} />
        </div>
        <div className="picture-info">
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
