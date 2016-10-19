/**
 * Created by zhangran on 16/10/2.
 */
import constants from '../../constants/'
import fetch from '../../../../util/fetch'

export function addGroup (name, des) {
  return dispatch => {
    dispatch({type: constants.group.START_ADD})
    add(name, des)
      .then(data => {
        dispatch({type: constants.group.ADD_SUCCESS})
      })
  }
}

export function getGroupList (name, des) {
  return dispatch => {
    getList()
      .then(data => {
        dispatch({type: constants.group.GET_LIST_SUCCESS, list: data})
      })
  }
}

/**
 * 添加用户组
 * @param name 名称
 * @param des 描述
 */
function add (name, des) {
  return fetch('/api/user/group', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `name=${name}&des=${des}`
  })
}

/**
 * 获取用户组列表
 */
function getList () {
  return fetch('/api/user/group', {
    method: 'GET'
  })
}
