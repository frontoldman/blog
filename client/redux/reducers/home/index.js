/**
 * Created by zhangran on 16/10/2.
 */

import { combineReducers } from 'redux'
import constants from '../../constants/'
import db from '../../../../db'

function repositoryList(state = db.repository, action) {
  switch(action.type) {
    case constants.GET_REPOSITORY:
      return db.repository
  }

  return state
}

export default combineReducers({
  repositoryList
})