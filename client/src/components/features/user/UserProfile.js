import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUserProfile } from "../../actions/userSelectors";
import { fetchUserProfile } from "../../actions/user";
import UserInfo from "../picture/UserInfo";
import PictureListContainer from "../picture/PictureListContainer";

const UserProfile = ({ match }) => {
  const userInfo = useSelector(selectUserProfile);
  const dispatch = useDispatch();
  const userId = match.params.id;

  useEffect(() => {
    dispatch(fetchUserProfile(userId));
  }, [fetchUserProfile]);

  console.log(userInfo);
  return (
    <div className="user-profile">
      <UserInfo author={userInfo} />
      <PictureListContainer
        pictures={userInfo.pictures}
        author={userInfo}
        from="user"
        favorites={false}
      />
    </div>
  );
};

export default withRouter(UserProfile);
