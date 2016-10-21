/**
 * Created by zhangran on 16/10/21.
 */
import constants from '../../constants/'
import fetch from '../../../../util/fetch'

export function login (username, password) {
  return dispatch => {
    dispatch({type: constants.login.START})
    loginFetch(username, password)
        .then(data => {
          dispatch({
            type: constants.login.SUCCESS
          })
        }, e => {
          dispatch({
            type: constants.login.FAIL
          })
        })
  }
}

function loginFetch (username, password) {
  return fetch(`/api/login`, {
    method: 'POST',
    body: {
      username,
      password
    }
  })
}
