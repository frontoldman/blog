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
import viewStyle from './view_style.less'

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

      <div>
        <ul></ul>

        <div className="mt-5">
          <form>
            <dl className="form-group">
              <dt><label>添加评论</label></dt>
              <dd>
                <textarea className="form-control input-block" placeholder="支持markdown语法"></textarea>
              </dd>
            </dl>

            <div className="form-actions mt-2">
              <button type="button" className="btn btn-primary">提交评论</button>
              <button type="button" className="btn">取消</button>
            </div>
          </form>
        </div>
      </div>
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
