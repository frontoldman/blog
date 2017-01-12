/**
 * Created by zhangran on 17/1/12.
 */

import React, { Component } from 'react'

export default class index extends Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  handleClick (e) {
    this.context.router.goBack()
  }

  render () {
    return (
      <button type="button" onClick={this.handleClick} className="btn btn-outline ml-5">返回</button>
    )
  }
}
