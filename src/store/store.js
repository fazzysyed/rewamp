import { createBrowserHistory } from "history";

import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
// import { routerMiddleware } from "connected-react-router";

export const history = createBrowserHistory();

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("BuilderState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("BuilderState", serializedState);
  } catch (e) {
    // Ignore write errors;
  }
};

const persistedState = loadState();

const middleware = [thunk];

// const store = createStore(
//   rootReducer,
//   persistedState,
//   composeWithDevTools(applyMiddleware(...middleware))
// );

const store = createStore(
  rootReducer(history), // root reducer with router state
  persistedState,
  composeWithDevTools(
    applyMiddleware(
      // routerMiddleware(history),
      ...middleware // for dispatching history actions
      // ... other middlewares ...
    )
  )
);

// store.subscribe(() => {
//   saveState(store.getState());
// });

export default store;
