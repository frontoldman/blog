import React, { Component } from 'react'
import 'primer-css/build/build.css'

export default class Layout extends Component {
  render () {
    const {
      children
    } = this.props

    return (
      <div className="container">
        {children}
      </div>
    )
  }
}
