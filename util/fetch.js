/**
 * Created by zhangran on 16/10/17.
 */

import fetch from 'isomorphic-fetch'
import { server as serverConfig } from '../config'

module.exports = function (url, fetchConfig) {
  var urlPre = ''

  try {
    window
  } catch (e) {
    urlPre = `http://${serverConfig.host}:${serverConfig.port}`
  }

  const config = {
    credentials: 'include'
  }
  var fetchPromise
  var body, query, _query

  fetchConfig.headers = fetchConfig.headers || {}
  fetchConfig.headers['xhr'] = 'xhr'

  if (fetchConfig.cookie) {
    fetchConfig.headers['cookie'] = fetchConfig.cookie
    delete fetchConfig.cookie
  }

  if (/post|put/i.test(fetchConfig.method)) {
    body = fetchConfig.body
    if (typeof body === 'object') {
      fetchConfig.body = Object.keys(body).map(key => `${key}=${body[key]}`).join('&')
    }
    fetchConfig.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  } else {
    query = fetchConfig.query
    if (typeof query === 'object') {
      _query = Object.keys(query).map(key => `${key}=${query[key]}`).join('&')
      if (url.indexOf('?') !== -1) {
        url += '&' + _query
      } else {
        url += '?' + _query
      }
    }
  }

  fetchPromise = fetch(urlPre + url, {
    ...config,
    ...fetchConfig
  }).then(
    response => {
      if (response.ok) {
        return response.json()
      }
      return Promise.reject(response)
    }
  )

  fetchPromise.catch(e => {
    // 程序内部错误
    if (e instanceof Response) {
      switch (e.status) {
        case 401:
          // browserHistory.push('/login')
          break
        case 500:
          break
      }
    } else {
    }
  })

  return fetchPromise
}
