import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import group from './group'
import user from './user'
import login from './login'
import article from './article'

const rootReducer = combineReducers({
  routing: routerReducer,
  group,
  user,
  login,
  article
})

export default rootReducer
