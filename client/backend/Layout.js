import React, { Component } from 'react'
import 'primer-css/build/build.css'
import { connect } from 'react-redux'
import constants from '../redux/constants/'
// import { bindActionCreators } from 'redux'

class Layout extends Component {
  componentDidMount () {
    const { dispatch } = this.props
    dispatch({
      type: constants.system.SERVER_RENDERED
    })
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

function mapStateToProps () {
  return {

  }
}

export default connect(mapStateToProps)(Layout)
