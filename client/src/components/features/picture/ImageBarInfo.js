import React from "react";
import useRedirect from "../../lib/hooks/useRedirect";

const ImageBarInfo = ({ picture, author }) => {
  const { redirectTo, renderRedirect } = useRedirect();

  function redirectToUserProfile() {
    redirectTo(`/users/${picture.author._id}/?tab=latest`);
  }

  return (
    <>
      {renderRedirect()}
      <div className="image-info">
        <p className="image-name">{picture.name}</p>
        <p className="author-name-wrapper">
          author:{" "}
          <i className="author-name" onClick={redirectToUserProfile}>
            {author.username}
          </i>
        </p>
      </div>
    </>
  );
};

export default ImageBarInfo;
