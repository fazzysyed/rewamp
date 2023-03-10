import { combineReducers } from "redux";
import Reducer from "../reducers/reducers";

// export default combineReducers({
//     Reducer,
// });
// import { connectRouter } from "connected-react-router";

const createRootReducer = (history) =>
  combineReducers({
    // router: connectRouter(history),

    Reducer: Reducer,
  });
export default createRootReducer;
