/**
 * Created by zhangran on 16/10/14.
 */

import React, { Component } from 'react'
import {connect} from 'react-redux'
import { login } from '../../redux/actions/login/'
import { browserHistory } from 'react-router'

class Login extends Component {
  constructor (props) {
    super(props)
    this.submit = this.submit.bind(this)
  }

  state = {
    username: '',
    password: ''
  }

  submit (e) {
    e.preventDefault()
    const { login } = this.props
    const { username, password } = this.state
    login(username, password)
  }

  componentWillReceiveProps (nextProps) {
    const { loginStatus } = nextProps
    switch (loginStatus.status) {
      case 2:
        setTimeout(() => {
          browserHistory.push('/admin/dashboard/')
        })
        break
    }
  }

  render () {
    return (<div className="columns">
      <div className="one-third column centered">
        <div className="border mt-5">
          <div className="p-3 bg-blue-light">登陆前端博客</div>
          <div className="p-3">
            <form onSubmit={this.submit}>
              <input className="form-control input-block" onChange={e => (this.setState({username: e.target.value}))} type="text" placeholder="输入用户名" />
              <input className="form-control input-block mt-3" onChange={e => (this.setState({password: e.target.value}))} type="password" placeholder="输入密码" />
              <button className="btn btn-primary mt-3 input-block" type="submit">登 陆</button>
            </form>
          </div>
        </div>
      </div>
    </div>)
  }
}

function mapStateToProps (state, ownProps) {
  return {
    loginStatus: state.login.loginStatus
  }
}

export default connect(mapStateToProps, {
  login
})(Login)
