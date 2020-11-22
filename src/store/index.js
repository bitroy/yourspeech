import filtersReducer from "components/filters/filtersReducer";
import speechReducer from "components/speech/speechReducer";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

export default function store() {
  return createStore(
    combineReducers({
      speeches: speechReducer,
      filters: filtersReducer,
    }),
    composeWithDevTools(applyMiddleware(thunk))
  );
};
