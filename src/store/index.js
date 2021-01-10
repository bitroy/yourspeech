import filtersReducer from "components/filters/filtersReducer";
import speechReducer from "components/speech/speechReducer";
import { applyMiddleware, combineReducers, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

export default function store() {
  let middleware = [thunk];

  if (process.env.NODE_ENV === "development") {
    middleware.push(logger);
  }
  return createStore(
    combineReducers({
      speeches: speechReducer,
      filters: filtersReducer,
    }),
    applyMiddleware(...middleware)
  );
}
