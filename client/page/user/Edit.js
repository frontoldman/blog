/**
 * Created by zhangran on 16/10/16.
 */

import {connect} from 'react-redux'

import EditBase from './EditBase'
import { clearUser, getDetail, saveDetail } from '../../redux/actions/user/'
import { getGroupList } from '../../redux/actions/group/'

class GroupEdit extends EditBase {
  componentDidMount () {
    const { getDetail, routeParams, getGroupList } = this.props
    getGroupList()
    getDetail(routeParams.id)
  }

  save (event) {
    const { detail, saveDetail } = this.props
    const { username, nickname, password, groupId } = this.state
    event.preventDefault()
    saveDetail(detail._id, username, nickname, password, groupId)
  }
}

function mapStateToProps (state, ownProps) {
  return {
    userChanged: state.user.changed,
    detail: state.user.detail,
    group: state.group.listData
  }
}

export default connect(mapStateToProps, {
  getGroupList,
  clearUser,
  getDetail,
  saveDetail
})(GroupEdit)
