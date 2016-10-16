/**
 * Created by zhangran on 16/10/16.
 */

import React, { Component } from 'react'
import {connect} from 'react-redux'
import {getRepository} from '../redux/actions/repository/'

class GroupList extends Component {
  render () {
    return (<div className="group-list">
      <table className="border">
        <thead>
        <tr>
          <th className="border py-2 px-2">用户组名称</th>
          <th className="border py-2 px-2">描述</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td className="border py-2 px-4">用户组1</td>
          <td className="border py-2 px-4">用户组1不错</td>
        </tr>
        </tbody>
      </table>
    </div>)
  }
}

function mapStateToProps (state, ownProps) {
  return {
    loginStatus: state.loginStatus
  }
}

export default connect(mapStateToProps, {
  getRepository
})(GroupList)
