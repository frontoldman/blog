/**
 * Created by zhangran on 16/10/16.
 */

import {connect} from 'react-redux'

import EditBase from './EditBase'
import { addGroup } from '../../redux/actions/group/'

class GroupAdd extends EditBase {
  save (event) {
    const { addGroup } = this.props
    const { name, des } = this.state
    event.preventDefault()
    addGroup(name, des)
  }
}

function mapStateToProps (state, ownProps) {
  return {
    groupChanged: state.group.changed,
    detail: state.group.detail
  }
}

export default connect(mapStateToProps, {
  addGroup
})(GroupAdd)
