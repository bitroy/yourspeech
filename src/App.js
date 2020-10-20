import React from "react";
import { Provider } from "react-redux";
import store from "./redux/index";
import AppRouter from "./routes/AppRouter";

export const applicationStore = store();

const App = () => {
  return (
    <Provider store={applicationStore}>
      <AppRouter />
    </Provider>
  );
};

export default App;
