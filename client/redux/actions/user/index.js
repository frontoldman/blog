/**
 * Created by zhangran on 16/10/2.
 */
import constants from '../../constants/'
import fetch from '../../../../util/fetch'

export function clearUser () {
  return {type: constants.user.CLEAR}
}

export function addUser (username, nickname, password, groupId) {
  return dispatch => {
    dispatch({type: constants.user.START_ADD})
    add(username, nickname, password, groupId)
      .then(data => {
        dispatch({type: constants.user.ADD_SUCCESS})
      })
  }
}

export function getUserList () {
  return dispatch => {
    getList()
      .then(data => {
        dispatch({type: constants.user.GET_LIST_SUCCESS, list: data})
      })
  }
}

export function getDetail (id) {
  return dispatch => {
    getDetailById(id)
      .then(data => dispatch({
        type: constants.user.GET_DETAIL_SUCCESS,
        data: data
      }))
  }
}

export function saveDetail (id, username, password, groupId) {
  return dispatch => {
    saveDetailById(id, username, password, groupId)
      .then(data => dispatch({
        type: constants.user.ADD_SUCCESS
      }))
  }
}

/**
 * 添加用户组
 * @param name 名称
 * @param des 描述
 */
function add (username, nickname, password, groupId) {
  return fetch('/api/user/admin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: {
      username,
      nickname,
      password,
      groupId
    }
  })
}

/**
 * 获取用户组列表
 */
function getList () {
  return fetch('/api/user/admin', {
    method: 'GET',
    query: {
      pageSize: 10,
      pageCur: 0
    }
  })
}

/**
 * 根据用户组id获取详情
 * @param id
 */
function getDetailById (id) {
  return fetch(`/api/user/admin/${id}`, {
    method: 'GET'
  })
}

/**
 * 保存用户组详情
 * @param id
 * @param name
 * @param des
 */
function saveDetailById (id, username, password, groupId) {
  return fetch(`/api/user/admin/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: {
      username,
      password,
      groupId
    }
  })
}
