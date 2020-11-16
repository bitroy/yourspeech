import React from "react";
import { Redirect, Route } from "react-router-dom";
import { firebase } from "../firebase/firebase";

const PublicRoute = ({ component: Component, ...rest }) => {
  let isLoggedIn = false;
  if(firebase.auth().currentUser) {
    isLoggedIn = true;
  }
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Redirect to="/home" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
