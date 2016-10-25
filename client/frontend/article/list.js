/**
 * Created by zhangran on 16/10/25.
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { getDetailView } from '../../redux/actions/article/'

class ArticleList extends Component {
  static getInitData (params) {
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
    const { view, getDetailView } = this.props
    if (view && !view.loaded) {
      this.constructor.getInitData()
        .then(data => getDetailView())
    }
  }

  componentWillUnmount () {
    //  执行清理工作
  }

  render () {
    const { view } = this.props
    return (<div className="group-list">
      文章详情{view}
    </div>)
  }
}

function mapStateToProps (state, ownProps) {
  return {
    view: state.article.view
  }
}

export default connect(mapStateToProps, {
  getDetailView
})(ArticleList)
