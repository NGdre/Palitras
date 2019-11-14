import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const condition = rest.protectAuth ? !rest.isLogged : rest.isLogged;
  return (
    <Route
      {...rest}
      render={props => {
        if (condition) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};

const mapStateToProps = state => {
  return {
    isLogged: state.auth.isLogged
  };
};

export default connect(mapStateToProps)(ProtectedRoute);
