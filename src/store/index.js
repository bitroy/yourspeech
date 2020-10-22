import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import speechReducer from "components/speech/speechReducer";

export default () => {
  const store = createStore(
    combineReducers({
      speeches: speechReducer
    }),
    composeWithDevTools(applyMiddleware(thunk))
  );

  return store;
};
