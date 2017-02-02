import React, { Component } from 'react'
import 'primer-css/build/build.css'

export default class Layout extends Component {
  componentDidMount () {
    console.log('parent did mount')
  }

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
