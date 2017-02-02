/**
 * Created by zhangran on 17/2/2.
 */

import {combineReducers} from 'redux'
import constants from '../../constants/'

/**
 * 如果flag是0:说明服务端已经渲染完成,不需要调用接口渲染数据,
 * 如果flag是1:说明跳出同构页面,需要重新调用接口
 * @param state
 * @param action
 * @returns {{flag: number}}
 */
function serverRender (state = {flag: 0}, action) {
  switch (action.type) {
    case constants.system.SERVER_RENDERED:
      return {flag: 1}
  }
  return state
}

export default combineReducers({
  serverRender
})
