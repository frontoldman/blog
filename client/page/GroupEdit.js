/**
 * Created by zhangran on 16/10/16.
 */

import React, { Component } from 'react'
import {connect} from 'react-redux'
import {getRepository} from '../redux/actions/repository/'

class GroupList extends Component {
  render () {
    return (<div className="group-form">
      <form>
        <dl className="form-group">
          <dt><label>用户组名称</label></dt>
          <dd><input className="form-control" type="text" placeholder="输入用户组名称" /></dd>
        </dl>
        <dl className="form-group">
          <dt><label>用户组描述</label></dt>
          <dd><input className="form-control" type="text" placeholder="输入用户组描述" /></dd>
        </dl>
        <dl className="form-group">
          <dd>
            <button type="submit" className="btn btn-primary">保存</button>
          </dd>
        </dl>
      </form>
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
