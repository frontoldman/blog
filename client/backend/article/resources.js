/**
 * Created by zhangran on 17/1/12.
 */
import fetch from '../../../util/fetch'

export function getOwnerList (params = {}) {
  return fetch('/api/article/admin', {
    method: 'GET',
    query: {
      pageSize: 10,
      pageNumber: params.pageNumber || 1
    }
  })
}

export function deleteArticleById (id) {
  return fetch(`/api/article/${id}`, {
    method: 'delete'
  })
}
