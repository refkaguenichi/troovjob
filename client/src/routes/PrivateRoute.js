import React from "react";
import { Route, Redirect } from "react-router";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Redirect to="/sign-in" />;
  }
  return <Route component={Component} {...rest} />;
};

export default PrivateRoute;
