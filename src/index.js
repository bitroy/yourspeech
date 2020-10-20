import React from "react";
import ReactDOM from "react-dom";
import { history } from "./routes/AppRouter";
import { firebase } from "./firebase/firebase";
import LoadingPage from "./components/general/LoadingPage";
import App from "./App";
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

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    renderApp();
    if (history.location.pathname === "/") {
      history.push("/home");
    }
  } else {
    renderApp();
    history.push("/");
  }
});
