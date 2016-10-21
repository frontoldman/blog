import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import group from './group/'
import user from './user/'
import login from './login'

const rootReducer = combineReducers({
  routing: routerReducer,
  group,
  user,
  login
})

export default rootReducer
