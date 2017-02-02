/**
 * Created by zhangran on 16/10/16.
 */

import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logOut } from '../redux/actions/login/'
import AdminStyle from './Admin.less'

class Admin extends Component {
  state = {
    menu: [{
      'path': '/admin/group',
      'name': '用户组管理'
    }, {
      'path': '/admin/user',
      'name': '用户管理'
    }, {
      'path': '/admin/article',
      'name': '文章管理'
    }],
    quitShowState: false
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  checkPathMatch (path) {
    const { pathname } = this.props.location
    return path === pathname
  }

  handleAvatarOver (e) {
    this.setState({
      quitShowState: true
    })
  }

  handleAvatarOut (e) {
    this.setState({
      quitShowState: false
    })
  }

  handleLogOut (e) {
    const { logOut } = this.props
    logOut()
  }

  componentWillReceiveProps (props) {
    if (props.loginStatus.status === 0) {
      this.context.router.push('/login')
    }
  }

  render () {
    const {
      children,
      user
    } = this.props

    return (
      <div>
        <div className="blankslate position-relative">
          <h3>前端杂记</h3>
          <div
            className="position-absolute right-0 top-0 border"
            onMouseOver={this.handleAvatarOver.bind(this)}
            onMouseOut={this.handleAvatarOut.bind(this)}>
            <img className="avatar" src={user.avatar} width="72" height="72" />
            <div className={AdminStyle.tip}
                 onClick={this.handleLogOut.bind(this)}
                 style={{display: this.state.quitShowState ? 'block' : 'none'}}>退出登录</div>
          </div>
        </div>
        <div className="columns mt-3">
          <div className="one-fifth column">
            <nav className="menu">
              {
                this.state.menu.map((item, index) => {
                  return (<Link key={index} className={'menu-item' + (this.checkPathMatch(item.path) ? ' selected' : '')} to={item.path}>{item.name}</Link>)
                })
              }
            </nav>
          </div>
          <div className="four-fifths column">
            {children}
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  return {
    user: state.user.loginUser,
    loginStatus: state.login.loginStatus,
    system: state.system
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  return {
    dispatch,
    ...bindActionCreators({
      logOut
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)
