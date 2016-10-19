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

export function getGroupList () {
  return dispatch => {
    getList()
      .then(data => {
        dispatch({type: constants.group.GET_LIST_SUCCESS, list: data})
      })
  }
}

export function getDetail (id) {
  return dispatch => {
    getDetailById(id)
      .then(data => dispatch({
        type: constants.group.GET_DETAIL_SUCCESS,
        data: data
      }))
  }
}

export function saveDetail (id, name, detail) {
  return dispatch => {
    saveDetailById(id, name, detail)
      .then(data => dispatch({
        type: constants.group.ADD_SUCCESS
      }))
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

/**
 * 根据用户组id获取详情
 * @param id
 */
function getDetailById (id) {
  return fetch(`/api/user/group/${id}`, {
    method: 'GET'
  })
}

/**
 * 保存用户组详情
 * @param id
 * @param name
 * @param des
 */
function saveDetailById (id, name, des) {
  return fetch(`/api/user/group/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `name=${name}&des=${des}`
  })
}
