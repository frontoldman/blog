/**
 * Created by zhangran on 16/10/17.
 */

import {combineReducers} from 'redux'
import constants from '../../constants/'

const { group } = constants

var groupInitState = {
  status: 0,  // 0: 正常状态 1: 开始保存 2: 保存成功 3: 保存失败
  detail: null
}

/**
 *
 * @param state
 * @param action
 */
function changed (state = groupInitState, action) {
  switch (action.type) {
    case group.START_ADD:
      return {...state, status: 1}
    case group.ADD_SUCCESS:
      return {...state, status: 2}
  }

  return state
}

/**
 *
 * @param state
 * @param action
 * @returns {*}
 */
function listData (state = {list: [], page: {}}, action) {
  switch (action.type) {
    case group.GET_LIST_SUCCESS:
      return {...state, list: action.list, page: action.page}
  }
  return state
}

export default combineReducers({
  changed,
  listData
})
