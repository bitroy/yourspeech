import LoadingPage from "components/general/LoadingPage";
import React from "react";
import ReactDOM from "react-dom";
import { history } from "routes/AppRouter";
import App from "./App";
import { auth } from "./firebase/firebase";
import "./styles/index.css";

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      document.getElementById("root")
    );
    hasRendered = true;
  }
};

ReactDOM.render(
  <React.StrictMode>
    <LoadingPage />
  </React.StrictMode>,
  document.getElementById("root")
);

auth.onAuthStateChanged((user) => {
  if (user?.emailVerified) {
    if (history.location.pathname === "/") {
      history.push("/home")
    }
    renderApp();
  } else {
    renderApp();
    history.push("/");
  }
});
