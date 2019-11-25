import React from "react";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";

const ImageBarInfo = ({ picture, author }) => {
  const dispatch = useDispatch();

  function redirectToUserProfile() {
    dispatch(push(`/users/${picture.author._id}/?tab=latest`));
  }

  return (
    <div className="image-info">
      <p className="image-name">{picture.name}</p>
      <p className="author-name-wrapper">
        author:{" "}
        <i className="author-name" onClick={redirectToUserProfile}>
          {author.username || author.email}
        </i>
      </p>
    </div>
  );
};

export default ImageBarInfo;
