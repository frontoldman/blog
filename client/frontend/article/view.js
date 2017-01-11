/**
 * Created by zhangran on 16/10/24.
 */

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import constants from '../../redux/constants/'
import { getDetailView } from '../../redux/actions/article/'
import { getView } from '../../redux/resouces/article/'

class ArticleView extends Component {
  static getInitData (params, cookie, dispatch) {
    return getView(params, cookie)
      .then(data => dispatch({
        type: constants.article.GET_DETAIL_VIEW_SUCCESS,
        data: data
      }))
  }

  componentDidMount () {
    const { params, hasLoaded, dispatch } = this.props
    if (!hasLoaded) {
      this.constructor.getInitData(params, null, dispatch)
    }
  }

  componentWillUnmount () {
  }

  render () {
    const { article } = this.props

    return (<div className="article-detail">
      <h1>{article.title}</h1>
      <p>{article.content}</p>
      <div><Link to={'/frontend/article'}>文章列表</Link></div>
    </div>)
  }
}

function mapStateToProps (state, ownProps) {
  var id = ownProps.params.id
  var article = state.article.view.data.filter(article => id === article._id)
  var hasLoaded = false
  if (article.length) {
    article = article[0]
    hasLoaded = true
  } else {
    article = {}
    hasLoaded = false
  }

  return {
    article,
    hasLoaded
  }
}

// dispatch 可以放置到props上
function mapDispatchToProps (dispatch, ownProps) {
  return {
    dispatch,
    ...bindActionCreators({getDetailView}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleView)
