/**
 * Created by zhangran on 16/10/16.
 */

import {connect} from 'react-redux'

import EditBase from './EditBase'
import { getDetail, saveDetail, clearGroup } from '../../redux/actions/group/'

class GroupEdit extends EditBase {
  componentDidMount () {
    const { getDetail, routeParams } = this.props
    getDetail(routeParams.id)
  }

  save (event) {
    const { detail, saveDetail } = this.props
    const { name, des } = this.state
    event.preventDefault()
    saveDetail(detail._id, name, des)
  }
}

function mapStateToProps (state, ownProps) {
  return {
    groupChanged: state.group.changed,
    detail: state.group.detail
  }
}

export default connect(mapStateToProps, {
  getDetail,
  saveDetail,
  clearGroup
})(GroupEdit)
