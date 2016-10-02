import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import home from "./home/";

const rootReducer = combineReducers({
  home,
  routing: routerReducer
})

export default rootReducer
