import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  return (
    <Route
      //path={path}
      {...rest}
      render={props => {
        if (!auth.getCurrentUser()) return <Redirect to="/LoginAdmin" />;
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
