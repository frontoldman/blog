/**
 * Created by zhangran on 16/10/2.
 */
import constants from '../../constants/'
import fetch from '../../../../util/fetch'

export function clearArticle () {
  return {type: constants.article.CLEAR}
}

export function addArticle (title, content, tags) {
  return dispatch => {
    dispatch({type: constants.article.START_ADD})
    add(title, content, tags)
      .then(data => {
        dispatch({type: constants.article.ADD_SUCCESS})
      })
  }
}

export function getArticleList () {
  return dispatch => {
    getList()
      .then(data => {
        dispatch({type: constants.article.GET_LIST_SUCCESS, list: data})
      })
  }
}

export function getDetail (id) {
  return dispatch => {
    getDetailById(id)
      .then(data => dispatch({
        type: constants.article.GET_DETAIL_SUCCESS,
        data: data
      }))
  }
}

export function saveDetail (id, title, content, tags) {
  return dispatch => {
    saveDetailById(id, title, content, tags)
      .then(data => dispatch({
        type: constants.article.ADD_SUCCESS
      }))
  }
}

export function getDetailView (data) {
  return {
    type: constants.article.GET_DETAIL_VIEW_SUCCESS,
    data: data.data
  }
}

/**
 *
 * @returns {function()}
 */
export function getArticleViewList () {
  return dispatch => {
    getList()
      .then(data => {
        console.log(data)
        dispatch({type: constants.article.GET_LIST_VIEW_SUCCESS, data: data})
      })
  }
}

/**
 *
 * @returns {function()}
 */
export function clearArticleList () {
  return {
    type: constants.article.CLEAR_LIST_VIEW
  }
}

export function clearArticleView () {
  return {
    type: constants.article.CLEAR_DETAIL_VIEW
  }
}

/**
 * 添加文章
 * @param title
 * @param content
 * @param tags
 */
function add (title, content, tags) {
  return fetch('/api/article', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: {
      title,
      content,
      tags
    }
  })
}

/**
 * 获取文章列表
 */
function getList () {
  return fetch('/api/article', {
    method: 'GET',
    query: {
      pageSize: 10,
      pageCur: 0
    }
  })
}

/**
 * 根据文章id获取详情
 * @param id
 */
function getDetailById (id) {
  return fetch(`/api/article/${id}`, {
    method: 'GET'
  })
}

/**
 * 保存用户组详情
 * @param id
 * @param name
 * @param des
 */
function saveDetailById (id, title, content, tags) {
  return fetch(`/api/article/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: {
      title,
      content,
      tags
    }
  })
}
