/**
 * Created by zhangran on 16/10/2.
 */

import {combineReducers} from 'redux'
import constants from '../../constants/'

function repositoryList (state = {}, action) {
  switch (action.type) {
    case constants.GET_REPOSITORY:
      return {}
  }

  return state
}

function repositoryRelease (state = {status: -1, msg: '准备发布'}, action) {
  switch (action.type) {
    case constants.REPOSITORY_RELEASE_START:
      return {...state, status: 0, msg: '正在发布'}
    case constants.REPOSITORY_RELEASE_SUCCESS:
      return {...state, status: 1, msg: '发布成功'}
    case constants.REPOSITORY_RELEASE_FAIL:
      return {...state, status: 2, msg: '发布失败'}
  }

  return state
}

export default combineReducers({
  repositoryList,
  repositoryRelease
})
