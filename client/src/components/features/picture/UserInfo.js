import React from "react";
import { useSelector } from "react-redux";
import useRedirect from "../../lib/hooks/useRedirect";
// import Button from "../../lib/buttons/Button";

function UserInfo({ author }) {
  const userId = useSelector(state => state.user.userInfo._id);
  const { redirectTo, renderRedirect } = useRedirect();

  const redirectToProfile = () => {
    redirectTo(`/users/${userId}/?tab=latest`);
  };

  return (
    <>
      {renderRedirect()}
      <section className="user-section">
        <div className="avatar" onClick={redirectToProfile}>
          {author.avatar ? (
            <img src={author.avatar} alt={author.username} />
          ) : (
            <i className="material-icons">person</i>
          )}
        </div>

        <div className="user-info">
          <h4 className="username">{author.username || author.email}</h4>
          <div>
            {/* <p className="followers">{author.amountOfFollowers}2 followers</p> */}
            <p className="pictures-amount">
              {author.amountOfPictures} pictures
            </p>
          </div>
        </div>
        {/* <Button>
        <i className="material-icons"> person_add</i>follow
      </Button> */}
      </section>
    </>
  );
}

export default UserInfo;
