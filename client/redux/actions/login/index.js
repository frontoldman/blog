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
          dispatch({
            type: constants.user.LOGIN_USER,
            data: data
          })
        }, e => {
          dispatch({
            type: constants.login.FAIL
          })
        })
  }
}

export function logOut () {
  return dispatch => {
    logoutFetch()
      .then(data => {
        dispatch({
          type: constants.login.CLEAR
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

function logoutFetch () {
  return fetch('/api/logout', {
    method: 'GET'
  })
}
