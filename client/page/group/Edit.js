/**
 * Created by zhangran on 16/10/16.
 */

import {connect} from 'react-redux'

import EditBase from './EditBase'
import { getDetail } from '../../redux/actions/group/'

class GroupEdit extends EditBase {
  componentDidMount () {
    const { getDetail, routeParams } = this.props
    getDetail(routeParams.id)
  }
}

function mapStateToProps (state, ownProps) {
  return {
    groupChanged: state.group.changed
  }
}

export default connect(mapStateToProps, {
  getDetail
})(GroupEdit)
