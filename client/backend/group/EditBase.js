/**
 * Created by zhangran on 16/10/19.
 */

import React, { Component } from 'react'
import { browserHistory } from 'react-router'

export default class EditBase extends Component {
  constructor (props) {
    super(props)
    props.clearGroup()
    this.save = this.save.bind(this)
  }

  state = {
    name: this.props.detail.name || '',
    des: this.props.detail.des || ''
  }

  componentWillReceiveProps (nextProps) {
    const { groupChanged, detail } = nextProps
    switch (groupChanged.status) {
      case 2:
        setTimeout(() => {
          browserHistory.push('/admin/group/')
        })
        break
      case 0:
      case 4:
        this.state.name = detail.name
        this.state.des = detail.des
        break
    }
  }

  renderLoding () {
    var { status } = this.props.groupChanged
    switch (status) {
      case 1:
        return (<div className="flash">
          正在提交...
        </div>)
      case 2:
        return (<div className="flash">
          保存成功
        </div>)
      case 3:
        return (<div className="flash">
          保存失败
        </div>)
    }
  }

  render () {
    return (<div className="group-form">
      {this.renderLoding()}
      <form onSubmit={this.save}>
        <dl className="form-group">
          <dt><label>用户组名称</label></dt>
          <dd><input className="form-control" value={this.state.name} onChange={ e => (this.setState({name: e.target.value}))} type="text" placeholder="输入用户组名称" /></dd>
        </dl>
        <dl className="form-group">
          <dt><label>用户组描述</label></dt>
          <dd>
            <textarea className="form-control" value={this.state.des} onChange={ e => (this.setState({des: e.target.value}))} placeholder="输入用户组描述"></textarea>
          </dd>
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
