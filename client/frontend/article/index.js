/**
 * Created by zhangran on 16/10/24.
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { getDetailView } from '../../redux/actions/article/'

class Artcile extends Component {
  static getInitData (dispatch, components, params) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({type: 'HAHA_TEST'})
      }, 1000)
    })
  }

  constructor (props) {
    super(props)
    // Artcile.getInitData()
    // console.log(props.view)
    // console.log(props.dispatch)
  }

  componentDidMount () {
    const { dispatch } = this.props
    // getArticle()
  }

  render () {
    const { view } = this.props
    return (<div className="group-list">
      文章详情{view}
    </div>)
  }
}

function mapStateToProps (state, ownProps) {
  console.log(state.article.view)
  return {
    view: state.article.view
  }
}

export default connect(mapStateToProps, {
  getDetailView
})(Artcile)
