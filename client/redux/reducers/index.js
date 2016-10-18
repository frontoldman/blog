import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import group from './group/'

const rootReducer = combineReducers({
  routing: routerReducer,
  group
})

export default rootReducer
