import React from "react";
import { Router, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import HomePage from "../components/general/HomePage";
import LoginPage from "../components/general/LoginPage";
import PageNotFound from "../components/general/PageNotFound";


export const history = createBrowserHistory();

const AppRouter = () => {
  return (
    <Router history={history}>
      <Switch>
        <PublicRoute path="/" component={LoginPage} exact={true} />
        <PrivateRoute path="/home" component={HomePage} />
        <PublicRoute component={PageNotFound} />
      </Switch>
    </Router>
  );
};
export default AppRouter;
