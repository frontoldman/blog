/**
 * Created by zhangran on 16/10/26.
 */
import fetch from '../../../../util/fetch'

export function getList (params = {}, cookie) {
  return fetch('/api/article/', {
    method: 'GET',
    query: {
      pageSize: 10,
      pageNumber: params.pageNumber || 1
    },
    cookie
  })
}

export function getView (params = {}, cookie) {
  return fetch(`/api/article/${params.id}`, {
    method: 'GET',
    cookie
  })
}

export function saveComment (params = {}, cookie) {
  return fetch(`/api/comment/${params.articleId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: {
      content: params.commentContent
    },
    cookie
  })
}

export function getCommentList (params = {}, cookie) {
  return fetch(`/api/comment/${params.articleId}`, {
    method: 'GET',
    cookie
  })
}
