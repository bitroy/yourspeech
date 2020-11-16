import React from "react";
import { Redirect, Route } from "react-router-dom";
import { firebase } from "../firebase/firebase";
import NavHeader from "../components/general/NavHeader";

const PrivateRoute = ({ component: Component, ...rest }) => {
  let isLoggedIn = false;
  if (firebase.auth().currentUser) {
    isLoggedIn = true;
  }
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <>
            <NavHeader />
            <Component {...props} />
          </>
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default PrivateRoute;
