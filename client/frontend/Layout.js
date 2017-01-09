/**
 * Created by zhangran on 16/10/24.
 */

import React, {Component} from 'react'
import { Link } from 'react-router'

export default class Admin extends Component {
  state = {

  }



  render () {
    const {
      children
    } = this.props

    return (
      <div>
        <div className="columns mt-3">
          {children}
        </div>
      </div>
    )
  }
}
