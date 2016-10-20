/**
 * Created by zhangran on 16/10/16.
 */

import {connect} from 'react-redux'

import EditBase from './EditBase'
import { addUser, clearUser } from '../../redux/actions/user/'
import { getGroupList } from '../../redux/actions/group/'

class UserAdd extends EditBase {
  save (event) {
    const { addUser } = this.props
    const { name, password, groupId, nickname } = this.state

    var isValid = super.validate()
    event.preventDefault()
    if (isValid) {
      addUser(name, nickname, password, groupId)
    }
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
  addUser,
  clearUser
})(UserAdd)
