/**
 * Created by zhangran on 16/10/22.
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'

class DashBoard extends Component {
  render () {
    return (<div>
      dashboard
    </div>)
  }
}

function mapStateToProps (state, ownProps) {
  return {
  }
}

export default connect(mapStateToProps, {
})(DashBoard)
