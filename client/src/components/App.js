import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import "../stylesheets/main.scss";

import Header from "./features/nav/Header";

import { useDispatch } from "react-redux";
import { checkAuthorization } from "./actions/auth";
import { useSelector } from "react-redux";
import { fetchUserInfo, clearCurrentSomeUser } from "./actions/user";
import { clearCurrentPicture } from "./actions/picture";
import useOnLeaveRoute from "./hooks/useOnLeaveRoute";
import SwitchRoutes from "./routes/SwitchRoutes";
import SnackBar from "./features/snackbar/SnackBar";
import Footer from "./features/nav/Footer";
import NewSnackBar from "./features/snackbar/NewSnackBar";

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
  useOnLeaveRoute(pathname, /users/, clearCurrentSomeUser);

  return (
    <>
      <Header />
      <main className="height-100vh">
        <SwitchRoutes />
      </main>
      <SnackBar />
      <NewSnackBar />
      <Footer />
    </>
  );
}

export default withRouter(props => <App {...props} />);
