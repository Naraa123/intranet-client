import { applyMiddleware, createStore, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import appReducer from "./reducer";
const middlewares = [thunkMiddleware];

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

const store =
  process.env.NODE_ENV === "production"
    ? createStore(rootReducer, compose(applyMiddleware(...middlewares)))
    : createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(...middlewares))
      );

export default store;
