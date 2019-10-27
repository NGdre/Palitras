import React, { useEffect } from "react";
import qs from "qs";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUserProfile,
  selectUsersFavorites,
  selectUsersPictures
} from "../../actions/userSelectors";

import { fetchUserProfile } from "../../actions/user";
import UserInfo from "../picture/UserInfo";
import PictureListContainer from "../picture/PictureListContainer";
import Tabs from "../../lib/tabs/Tabs";

const UserProfile = ({ match, ...props }) => {
  const userInfo = useSelector(selectUserProfile);
  const usersPictures = useSelector(selectUsersPictures);
  const usersFavorites = useSelector(selectUsersFavorites);
  const dispatch = useDispatch();
  const userId = match.params.id;

  const { tab } = qs.parse(props.location.search.slice(1));

  const pictures = tab === "latest" ? usersPictures : usersFavorites;

  useEffect(() => {
    dispatch(fetchUserProfile(userId));
  }, [dispatch, userId]);

  const pathnames = [
    "latest",
    "popular",
    "collections",
    "favorites",
    "followings",
    "followers",
    "about me"
  ];

  return (
    <div className="user-profile">
      <UserInfo author={userInfo} />
      <Tabs id={userId} paths={pathnames} />
      <div className="red">
        <div className="container">
          <PictureListContainer
            pictures={pictures}
            author={userInfo}
            from="user"
            favorites={false}
          />
        </div>
      </div>
    </div>
  );
};

export default withRouter(UserProfile);
