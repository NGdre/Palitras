import React from "react";
import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import {
  SignUp,
  Login,
  Picture,
  AddPicture,
  Home,
  NotFound,
  Favorites,
  ResetPassword,
  UserProfilePage,
  MyPictures,
  EditPicturePage
} from "../../pages/";

const SwitchRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/pictures/:id" component={Picture} />
      <Route path="/users/:id" component={UserProfilePage} />
      <ProtectedRoute exact path="/account/upload" component={AddPicture} />
      <ProtectedRoute
        exact
        path="/account/my-pictures"
        component={MyPictures}
      />
      <ProtectedRoute exact path="/account/favorites" component={Favorites} />
      <ProtectedRoute
        exact
        path="/edit-picture/:id"
        component={EditPicturePage}
      />
      <ProtectedRoute
        path="/login"
        protectAuth="true"
        component={Login}
        exact
      />
      <ProtectedRoute
        path="/sign-up"
        protectAuth="true"
        component={SignUp}
        exact
      />
      <ProtectedRoute
        path="/forgot-password"
        protectAuth="true"
        component={ResetPassword}
        exact
      />
      <Route path="*" component={NotFound} />
    </Switch>
  );
};

export default SwitchRoutes;
