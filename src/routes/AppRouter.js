import LoadingPage from "components/general/LoadingPage";
import LoginPage from "components/general/LoginPage";
import SignUpPage from "components/general/SignUpPage";
import { createBrowserHistory } from "history";
import React, { lazy, Suspense } from "react";
import { Router, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const ForgotPassword = lazy(() => import("components/general/ForgotPassword"));
const PageNotFound = lazy(() => import("components/general/PageNotFound"));
const HomePage = lazy(() => import("components/general/HomePage"));
const EditSpeech = lazy(() => import("components/speech/EditSpeech"));
const ReadSpeech = lazy(() => import("components/speech/ReadSpeech"));
const WriteSpeech = lazy(() => import("components/speech/WriteSpeech"));

export const history = createBrowserHistory();

const AppRouter = () => {
  return (
    <Router history={history}>
      <Suspense fallback={<LoadingPage />}>
        <Switch>
          <PublicRoute path="/" component={LoginPage} exact={true} />
          <PublicRoute path="/signup" component={SignUpPage} exact={true} />
          <PublicRoute path="/forgotpassword" component={ForgotPassword} exact={true} />
          <PrivateRoute path="/home" component={HomePage} />
          <PrivateRoute path="/add" component={WriteSpeech} />
          <PrivateRoute path="/read/:id" component={ReadSpeech} />
          <PrivateRoute path="/edit/:id" component={EditSpeech} />
          <PublicRoute component={PageNotFound} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
