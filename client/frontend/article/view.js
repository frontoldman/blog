/**
 * Created by zhangran on 16/10/24.
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import constants from '../../redux/constants/'
import { getDetailView, clearArticleView } from '../../redux/actions/article/'
import { getView } from '../../redux/resouces/article/'

class ArticleView extends Component {
  static getInitData (params, cookie) {
    return getView(params, cookie)
      .then(data => {
        return {
          type: constants.article.GET_DETAIL_VIEW_SUCCESS,
          data: data
        }
      })
  }

  componentDidMount () {
    const { view, getDetailView, params } = this.props
    if (view && !view.loaded) {
      this.constructor.getInitData(params)
        .then(data => getDetailView(data))
    }
  }

  componentWillUnmount () {
  //  执行清理工作
    const { clearArticleView } = this.props
    clearArticleView()
  }

  render () {
    const { data } = this.props.view

    return (<div className="article-detail">
      <h1>{data.title}</h1>
      <p>{data.content}</p>
      <div><Link to={'/frontend/article'}>文章列表</Link></div>
    </div>)
  }
}

function mapStateToProps (state, ownProps) {
  return {
    view: state.article.view
  }
}

export default connect(mapStateToProps, {
  getDetailView,
  clearArticleView
})(ArticleView)
