import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import group from './group/'
import user from './user/'

const rootReducer = combineReducers({
  routing: routerReducer,
  group,
  user
})

export default rootReducer
