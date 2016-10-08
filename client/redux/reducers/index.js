import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import repository from "./repository/";

const rootReducer = combineReducers({
  repository,
  routing: routerReducer
})

export default rootReducer
