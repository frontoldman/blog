/**
 * Created by zhangran on 16/10/17.
 */

import {combineReducers} from 'redux'
import constants from '../../constants/'

var groupInitState = {
  status: 1,  // 1: 开始保存 2: 保存成功 3: 保存失败
  detail: null
}
/**
 *
 * @param state
 * @param action
 */
function groupChanged (state = groupInitState, action) {
  switch (action.type) {
    case constants.group.add:
      return state
  }
}

export default combineReducers({
  groupChanged
})
