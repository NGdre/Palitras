import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import PictureListContainer from "../features/picture/PictureListContainer";
import { fetchMyPictures } from "../actions/user";
import { selectMyPictures } from "../actions/userSelectors";

const MyPictures = () => {
  const dispatch = useDispatch();
  const myPictures = useSelector(selectMyPictures);

  useEffect(() => {
    dispatch(fetchMyPictures());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>My Pictures | Palitras</title>
      </Helmet>
      <div className="container">
        <PictureListContainer
          pictures={myPictures}
          favorites={false}
          myPictures={true}
          from="user"
        />
      </div>
    </>
  );
};

export default MyPictures;
