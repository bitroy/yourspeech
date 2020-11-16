import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import speechReducer from "components/speech/speechReducer";
import filterReducer from "components/speech/filtersReducer";

export default function store() {
  return createStore(
    combineReducers({
      speeches: speechReducer,
      filters: filterReducer,
    }),
    composeWithDevTools(applyMiddleware(thunk))
  );
};
