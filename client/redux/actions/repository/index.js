/**
 * Created by zhangran on 16/10/2.
 */
import constants from '../../constants/'

export function getRepository () {
  return dispatch => dispatch({
    type: constants.GET_REPOSITORY
  })
}
