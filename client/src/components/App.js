import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import "../stylesheets/main.scss";

import Header from "./features/nav/Header";

import { useDispatch } from "react-redux";
import { checkAuthorization } from "./actions/auth";
import { useSelector } from "react-redux";
import { fetchUserInfo } from "./actions/user";
import { clearCurrentPicture } from "./actions/picture";
import useOnLeaveRoute from "./lib/hooks/useOnLeaveRoute";
import SwitchRoutes from "./lib/routes/SwitchRoutes";
import SnackBar from "./lib/messages/SnackBar";
import Footer from "./features/nav/Footer";

function App(props) {
  const dispatch = useDispatch();
  const isLogged = useSelector(state => state.auth.isLogged);

  dispatch(checkAuthorization());

  useEffect(() => {
    if (isLogged) {
      dispatch(fetchUserInfo());
    }
  }, [dispatch, isLogged]);

  const { pathname } = props.location;
  useOnLeaveRoute(pathname, /pictures/, clearCurrentPicture);

  return (
    <>
      <Header />
      <main className="height-100vh">
        <SwitchRoutes />
      </main>
      <SnackBar />
      <Footer />
    </>
  );
}

export default withRouter(props => <App {...props} />);
