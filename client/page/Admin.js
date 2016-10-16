/**
 * Created by zhangran on 16/10/16.
 */

import React, {Component} from 'react'

export default class Admin extends Component {
  render () {
    const {
      children
    } = this.props

    return (
      <div>
        <div className="blankslate">
          <h3>前端博客管理</h3>
        </div>
        <div className="columns mt-3">

          <div className="one-fifth column">
            <nav className="menu">
              <a className="menu-item selected" href="#">Account</a>
              <a className="menu-item" href="#">Profile</a>
              <a className="menu-item" href="#">Emails</a>
              <a className="menu-item" href="#">Notifications</a>
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
