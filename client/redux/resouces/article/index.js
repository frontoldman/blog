/**
 * Created by zhangran on 16/10/26.
 */
import fetch from '../../../../util/fetch'

export function getList (params, cookie) {
  return fetch('/api/article/', {
    method: 'GET',
    query: {
      pageSize: 10,
      pageCur: 0
    },
    cookie: cookie
  })
}

export function getView (params, cookie) {
  return fetch(`/api/article/${params.id}`, {
    method: 'GET',
    cookie: cookie
  })
}
