/**
 * Created by zhangran on 16/10/8.
 */

import constants from "../../constants/";

const config = {
  credentials: 'include'
}

export function startRelease(params) {
  return dispatch => {
    dispatch({type: constants.REPOSITORY_RELEASE_START})

    var evtSource = new EventSource(`/api/release/${params.id}`, {
      withcredentials: true
    })

    evtSource.onmessage = function (event) {
      dispatch({
        type: constants.PACK_DETAIL,
        data: event.data
      })
    }

    evtSource.onerror = function(event) {
      evtSource.close()
    };

    evtSource.onopen = function(event) {
      console.log(event)
    };

    // start(params)

  }
}


function start(param) {
  return fetch(`/api/release/${param.id}`, {
    ...config,
    method: 'POST',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  })
}