import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import "../stylesheets/main.scss";
import { websiteName } from "../setupEnv";

import Header from "./features/nav/Header";

import { useDispatch } from "react-redux";
import { checkAuthorization } from "./actions/auth";
import { fetchUserInfo } from "./actions/user";
import { clearCurrentPicture } from "./actions/picture";
import useOnLeaveRoute from "./lib/hooks/useOnLeaveRoute";
import SwitchRoutes from "./lib/routes/SwitchRoutes";
import SnackBar from "./lib/messages/SnackBar";
import Footer from "./features/nav/Footer";

function App(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  const { pathname } = props.location;
  useOnLeaveRoute(pathname, /pictures/, clearCurrentPicture, {
    changeTitle: websiteName
  });

  checkAuthorization(dispatch);

  return (
    <div>
      <Header />
      <SwitchRoutes />
      <SnackBar />
      <Footer />
    </div>
  );
}

export default withRouter(props => <App {...props} />);
