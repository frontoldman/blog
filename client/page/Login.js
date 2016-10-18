/**
 * Created by zhangran on 16/10/14.
 */

import React, { Component } from 'react'
import {connect} from 'react-redux'

class Login extends Component {
  render () {
    return (<div className="columns">
      <div className="one-third column centered">
        <div className="border mt-5">
          <div className="p-3 bg-blue-light">登陆前端博客</div>
          <div className="p-3">
            <form>
              <input className="form-control input-block" type="text" placeholder="输入用户名" />
              <input className="form-control input-block mt-3" type="password" placeholder="输入密码" />
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
    loginStatus: state.loginStatus
  }
}

export default connect(mapStateToProps, {
})(Login)
