/**
 * Created by zhangran on 16/10/17.
 */

import {combineReducers} from 'redux'
import constants from '../../constants/'

const { article } = constants

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
    case article.CLEAR:
      return {...state, status: 0}
    case article.START_ADD:
      return {...state, status: 1}
    case article.ADD_SUCCESS:
      return {...state, status: 2}
    case article.GET_DETAIL_SUCCESS:
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
    case article.GET_LIST_SUCCESS:
      return {...state, list: action.list, page: action.page}
  }
  return state
}

/**
 *
 */
function detail (state = {_id: '', title: '', content: '', creater: '', tags: []}, action) {
  switch (action.type) {
    case article.CLEAR:
      return {_id: '', title: '', content: '', creater: '', tags: []}
    case article.GET_DETAIL_SUCCESS:
      return {
        _id: action.data._id,
        title: action.data.title,
        content: action.data.content,
        creater: action.data.creater,
        tags: action.data.tags
      }
  }
  return state
}

function view (state = 'test', action) {
  switch (action.type) {
    case 'HAHA_TEST':
      return 'setTimeout test success'
  }
  return state
}

export default combineReducers({
  changed,
  listData,
  detail,
  view
})
