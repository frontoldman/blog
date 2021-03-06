/**
 * Created by zhangran on 16/10/19.
 */

import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import Upload from 'rc-upload'
import Back from '../../component/Back/index'

const defaultAvatar = '/avatar.png'

export default class EditBase extends Component {
  constructor (props) {
    super(props)
    props.clearUser()
    this.save = this.save.bind(this)

    var self = this

    this.state = {
      username: this.props.detail.username || '',
      password: '',
      passwordRepeat: '',
      groupId: this.props.detail.groupId || '',
      nickname: this.props.detail.nickname || '',
      valid: true,
      avatar: this.props.detail.avatar || defaultAvatar,
      uploadProps: {
        supportServerRender: true,
        action: '/api/upload',
        onSuccess (file) {
          self.setState({
            avatar: file[0][1].filename
          })
        }
      }
    }
  }

  componentWillReceiveProps (nextProps) {
    const { userChanged, detail } = nextProps
    switch (userChanged.status) {
      case 2:
        setTimeout(() => {
          browserHistory.push('/admin/user')
        })
        break
      case 0:
      case 4:
        this.state.username = detail.username
        this.state.groupId = detail.groupId
        this.state.nickname = detail.nickname
        this.state.avatar = detail.avatar || defaultAvatar
        break
    }
  }

  validate () {
    const { password, passwordRepeat } = this.state
    if (password.trim() !== passwordRepeat.trim()) {
      this.setState({
        valid: false
      })
      return false
    } else {
      this.setState({
        valid: true
      })
    }

    return this.state.valid
  }

  renderLoding () {
    var { status } = this.props.userChanged
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
    const groupList = this.props.group.list

    return (<div className="group-form">
      {this.renderLoding()}
      <form onSubmit={this.save}>
        <dl className="form-group">
          <dt><label>用户名</label></dt>
          <dd><input className="form-control" value={this.state.username} onChange={ e => (this.setState({username: e.target.value}))} type="text" placeholder="输入用户名称" /></dd>
        </dl>
        <dl className="form-group">
          <dt><label>昵称</label></dt>
          <dd><input className="form-control" value={this.state.nickname} onChange={ e => (this.setState({nickname: e.target.value}))} type="text" placeholder="输入用户昵称" /></dd>
        </dl>
        <dl className="form-group">
          <dt><label>头像</label></dt>
          <dd>
            <Upload {...this.state.uploadProps} component="div" style={{ display: 'inline-block' }}>
              <img className="avatar" src={this.state.avatar} width="72" height="72" />
            </Upload>
          </dd>
        </dl>
        <dl className="form-group">
          <dt><label>密码</label></dt>
          <dd><input className="form-control" value={this.state.password} onChange={ e => (this.setState({password: e.target.value}))} type="password" placeholder="输入密码" /></dd>
        </dl>
        {
          this.state.valid
            ? (<dl className="form-group">
                <dt><label>确认密码</label></dt>
                <dd><input className="form-control" value={this.state.passwordRepeat} onChange={ e => (this.setState({passwordRepeat: e.target.value}))} type="password" placeholder="输入确认密码" /></dd>
                <dd className="error">请输入一致的密码</dd>
              </dl>)
            : (<dl className="form-group errored">
                <dt><label>确认密码</label></dt>
                <dd><input className="form-control" value={this.state.passwordRepeat} onChange={ e => (this.setState({passwordRepeat: e.target.value}))} type="password" placeholder="输入确认密码" /></dd>
                <dd className="error">请输入一致的密码</dd>
                </dl>)
        }
        <dl className="form-group">
          <dt><label>选择用户组</label></dt>
          <dd>
            <select className="form-select" value={this.state.groupId} onChange={e => (this.setState({groupId: e.target.value}))}>
              <option>请选择用户组</option>
              {
                groupList.map(group => {
                  return (<option key={group._id} value={group._id}>{group.name}</option>)
                })
              }
            </select>
          </dd>
        </dl>
        <dl className="form-group">
          <dd>
            <button type="submit" className="btn btn-primary">保存</button>
            <Back></Back>
          </dd>
        </dl>
      </form>
    </div>)
  }
}
