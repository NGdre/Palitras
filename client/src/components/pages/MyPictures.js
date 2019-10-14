import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PictureList from "../features/picture/PictureList";
import { fetchMyPictures } from "../actions/user";
import { selectMyPictures } from "../actions/userSelectors";

const MyPictures = () => {
  const dispatch = useDispatch();
  const myPictures = useSelector(selectMyPictures);

  useEffect(() => {
    dispatch(fetchMyPictures());
  }, [dispatch]);

  return (
    <div className="container">
      <PictureList pictures={myPictures} favorites={false} />
    </div>
  );
};

export default MyPictures;
