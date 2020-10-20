import React from "react";
import { Redirect, Route } from "react-router-dom";
import { firebase } from "../firebase/firebase";

const PrivateRoute = ({ isAuthenticated, component: Component, ...rest }) => {
  let isLoggedIn = false;
  if(firebase.auth().currentUser) {
    isLoggedIn = true;
  }
  return (
    <Route
      {...rest}
      component={(props) =>
        isLoggedIn ? (
          <div>
            <Component {...props} />
          </div>
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default PrivateRoute;
