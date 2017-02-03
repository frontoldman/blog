/**
 * Created by zhangran on 16/10/16.
 */

import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logOut } from '../redux/actions/login/'

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
    }]
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  checkPathMatch (path) {
    const { pathname } = this.props.location
    return path === pathname
  }

  render () {
    const {
      children
    } = this.props

    return (
      <div>
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
