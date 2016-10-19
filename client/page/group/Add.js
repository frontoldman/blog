/**
 * Created by zhangran on 16/10/16.
 */

import {connect} from 'react-redux'

import EditBase from './EditBase'
import { addGroup } from '../../redux/actions/group/'

class GroupAdd extends EditBase {
}

function mapStateToProps (state, ownProps) {
  return {
    groupChanged: state.group.changed
  }
}

export default connect(mapStateToProps, {
  addGroup
})(GroupAdd)
