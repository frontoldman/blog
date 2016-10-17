/**
 * Created by zhangran on 16/10/16.
 */

import React, { Component } from 'react'
import {connect} from 'react-redux'
import { addGroup } from '../redux/actions/group/'

class GroupEdit extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.save = this.save.bind(this)
  }

  save (event) {
    const { addGroup } = this.props
    const { name, des } = this.state
    event.preventDefault()
    this.setState({
      isLoading: true
    })
    addGroup(name, des)
      .then(data => console.log(data))
  }

  renderLoding () {
    var { isLoading } = this.state
    if (isLoading) {
      return (<div className="flash">
        正在提交...
      </div>)
    }
  }

  render () {
    return (<div className="group-form">
      {this.renderLoding()}
      <form onSubmit={this.save}>
        <dl className="form-group">
          <dt><label>用户组名称</label></dt>
          <dd><input className="form-control" onChange={ e => (this.state.name = e.target.value)} type="text" placeholder="输入用户组名称" /></dd>
        </dl>
        <dl className="form-group">
          <dt><label>用户组描述</label></dt>
          <dd><input className="form-control" onChange={ e => (this.state.des = e.target.value)} type="text" placeholder="输入用户组描述" /></dd>
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
  addGroup
})(GroupEdit)
