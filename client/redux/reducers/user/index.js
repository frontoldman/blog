/**
 * Created by zhangran on 16/10/17.
 */

import {combineReducers} from 'redux'
import constants from '../../constants/'

const { user } = constants

var groupInitState = {
  status: 0  // 0: 正常状态 1: 开始保存 2: 保存成功 3: 保存失败 4: 获取成功
}

/**
 *
 * @param state
 * @param action
 */
function changed (state = groupInitState, action) {
  switch (action.type) {
    case user.CLEAR:
      return {...state, status: 0}
    case user.START_ADD:
      return {...state, status: 1}
    case user.ADD_SUCCESS:
      return {...state, status: 2}
    case user.GET_DETAIL_SUCCESS:
      return {...state, status: 4}
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
    case user.GET_LIST_SUCCESS:
      return {...state, list: action.list, page: action.page}
  }
  return state
}

/**
 *
 */
function detail (state = {_id: '', nickName: '', name: '', groupId: ''}, action) {
  switch (action.type) {
    case user.CLEAR:
      return {_id: '', name: '', nickName: '', groupId: ''}
    case user.GET_DETAIL_SUCCESS:
      return {
        _id: action.data._id,
        name: action.data.name,
        nickName: action.data.nickName,
        groupId: action.data.groupId
      }
  }
  return state
}

export default combineReducers({
  changed,
  listData,
  detail
})
