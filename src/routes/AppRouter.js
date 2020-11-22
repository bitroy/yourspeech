import { Paper } from "@material-ui/core";
import { createBrowserHistory } from "history";
import React, { lazy, Suspense } from "react";
import { Router, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

export const history = createBrowserHistory();

const HomePage = lazy(() => import("../components/general/HomePage"));
const LoginPage = lazy(() => import("../components/general/LoginPage"));
const PageNotFound = lazy(() => import("../components/general/PageNotFound"));
const EditSpeech = lazy(() => import("components/speech/EditSpeech"));
const WriteSpeech = lazy(() => import("components/speech/WriteSpeech"));

const AppRouter = () => {
  return (
    <Router history={history}>
      <Suspense fallback={<Paper />}>
        <Switch>
          <PublicRoute path="/" component={LoginPage} exact={true} />
          <PrivateRoute path="/home" component={HomePage} />
          <PrivateRoute path="/add" component={WriteSpeech} />
          <PrivateRoute path="/edit/:id" component={EditSpeech} />
          <PublicRoute component={PageNotFound} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
