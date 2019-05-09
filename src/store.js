import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { rootReducer, defState } from "./reducers/rootReducer";

export default function configureStore(initialState = defState()) {
  return createStore(rootReducer, initialState, applyMiddleware(thunk));
}
