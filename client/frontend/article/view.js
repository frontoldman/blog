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
import Comment from './Comment'
import viewStyle from './view_style.less'

class ArticleView extends Component {
  static getInitData (params, cookie, dispatch) {
    return getView(params, cookie)
      .then(data => dispatch({
        type: constants.article.GET_DETAIL_VIEW_SUCCESS,
        data: data
      }))
  }

  static isomorphicComponents = [Comment]

  componentDidMount () {
    const { params, dispatch, system } = this.props
    if (system.serverRender.flag === 1) {
      this.constructor.getInitData(params, null, dispatch)
    }
  }

  render () {
    const { article } = this.props

    if (!article) {
      return null
    }

    return (<div className={viewStyle.article_detail}>
      <h1 className={viewStyle.title}>{article.title}</h1>
      <div className="columns">
        <div className="four-fifths column">
          <p className={viewStyle.content} dangerouslySetInnerHTML={{__html: article.content}}></p>
        </div>
        <div className="one-fifth column">
          <p className={viewStyle.tags}>
            {article.tags && article.tags.map((tag, index) => {
              return (<span key={index} className={viewStyle.tag}>{tag}</span>)
            })}
          </p>
        </div>
      </div>
      <div className={viewStyle.back}><Link to={'/frontend/article'}>←文章列表</Link></div>
      <Comment articleId={article._id}></Comment>
    </div>)
  }
}

function mapStateToProps (state, ownProps) {
  var id = ownProps.params.id
  var article = state.article.view.data.filter(article => id === article._id)
  var system = state.system
  if (article.length) {
    article = article[0]
  } else {
    article = null
  }

  return {
    article,
    system
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
