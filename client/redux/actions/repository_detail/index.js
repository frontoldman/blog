/**
 * Created by zhangran on 16/10/8.
 */

import constants from '../../constants/'

const config = {
  credentials: 'include'
}

export function startRelease(params) {
  return dispatch => {
    dispatch({type: constants.REPOSITORY_RELEASE_START})
    start(params)
      .then(response => {
          return response.json()
      })
      .then(resJson => {
        dispatch({type: constants.REPOSITORY_RELEASE_SUCCESS})
      })

  }
}


function start(param) {
  return fetch(`/api/release/${param.id}`, {
    ...config,
    method:'POST',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  })
}