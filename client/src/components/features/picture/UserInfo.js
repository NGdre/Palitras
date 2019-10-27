import React from "react";
// import Button from "../../lib/buttons/Button";

function UserInfo({ author }) {
  return (
    <section className="user-section">
      <div className="avatar">
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
          <p className="pictures-amount">{author.amountOfPictures} pictures</p>
        </div>
      </div>
      {/* <Button>
        <i className="material-icons"> person_add</i>follow
      </Button> */}
    </section>
  );
}

export default UserInfo;
