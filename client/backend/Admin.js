/**
 * Created by zhangran on 16/10/16.
 */

import React, {Component} from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

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
        <div className="blankslate position-relative">
          <h3>前端杂记</h3>
          <div className="position-absolute right-0 top-0">
            <img className="avatar" src={this.state.avatar} width="72" height="72" />
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
    listView: state.article.listView.data
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  return {
    dispatch,
    ...bindActionCreators({
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)
