import React from "react";
import { Redirect, Route } from "react-router-dom";
import NavHeader from "../components/general/NavHeader";
import { auth } from "../firebase/firebase";

const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !!auth.currentUser?.uid && auth.currentUser?.emailVerified ? (
          <Redirect to="/home" />
        ) : (
          <>
            <NavHeader />
            <Component {...props} />
          </>
        )
      }
    />
  );
};

export default PublicRoute;
