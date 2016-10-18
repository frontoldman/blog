/**
 * Created by zhangran on 16/10/17.
 */

import {browserHistory} from 'react-router'

module.exports = function (url, fetchConfig) {

  const config = {
    credentials: 'include'
  }

  const fetchPromise = fetch(url, {
    ...config,
    ...fetchConfig
  }).then(
    response => {
      if (response.ok) {
        return response.json()
      }

      throw response
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
