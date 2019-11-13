import React, { useEffect } from "react";
import qs from "qs";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUserProfile,
  selectUsersFavorites,
  selectUsersPictures
} from "../../actions/userSelectors";

import {
  fetchUserProfile,
  getUsersFavorites,
  getUsersPictures
} from "../../actions/user";
import UserInfo from "../picture/UserInfo";
import PictureListContainer from "../picture/PictureListContainer";
import Tabs from "../../lib/tabs/Tabs";
import Pagination from "../../lib/pagination/Pagination";

const UserProfile = ({ match }) => {
  const userInfo = useSelector(selectUserProfile);

  const usersPictures = useSelector(selectUsersPictures);
  const usersFavorites = useSelector(selectUsersFavorites);

  const location = useSelector(state => state.router.location);
  const dispatch = useDispatch();
  const userId = match.params.id;

  const { tab, page = 1 } = qs.parse(location.search.slice(1));

  useEffect(() => {
    if (tab === "favorites") {
      dispatch(getUsersFavorites(userId));
    }
  }, [tab, userId, dispatch]);

  useEffect(() => {
    dispatch(fetchUserProfile(userId));
  }, [dispatch, userId]);

  const pictures = tab === "latest" ? usersPictures.docs : usersFavorites;

  const pathnames = [
    "latest",
    "popular",
    "collections",
    "favorites",
    "followings",
    "followers",
    "about me"
  ];

  const fetchPage = React.useCallback(
    page => {
      dispatch(getUsersPictures(userId, page));
    },
    [dispatch, userId]
  );

  return (
    <div className="user-profile">
      <UserInfo author={userInfo} />
      <Tabs pathname={`/users/${userId}/`} paths={pathnames} />

      <div className="container">
        <PictureListContainer
          pictures={pictures}
          author={userInfo}
          from="user"
          favorites={false}
        />
        <Pagination
          fetchPage={fetchPage}
          defaultPage={+page}
          totalPages={usersPictures.pages}
          totalImages={usersPictures.total}
          pathname={location.pathname}
          search={`?tab=${tab}&page=`}
        />
      </div>
    </div>
  );
};

export default withRouter(UserProfile);
