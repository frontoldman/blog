import {combineReducers} from "redux";

const add = (state = 0, action) => {
  switch (action.type) {
    case 'ADD':
      return state + action.num
  }

  return state
}

export default combineReducers({
  add
})