import React from "react";
import { Provider } from "react-redux";
import AppRouter from "./routes/AppRouter";
import store from "./store/index";

export const applicationStore = store();

const App = () => {
  return (
    <Provider store={applicationStore}>
      <AppRouter />
    </Provider>
  );
};

export default App;
