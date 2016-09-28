import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import calc from "./calc";

const rootReducer = combineReducers({
  calc,
  routing: routerReducer
})

export default rootReducer
