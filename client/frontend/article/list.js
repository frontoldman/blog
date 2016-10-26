/**
 * Created by zhangran on 16/10/25.
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import constants from '../../redux/constants/'
import { getArticleViewList } from '../../redux/actions/article/'
import { getList } from '../../redux/resouces/article/'

class ArticleList extends Component {
  static getInitData (params, cookie) {
    return getList(params, cookie)
      .then(data => {
        return {
          type: constants.article.GET_LIST_VIEW_SUCCESS,
          data: data
        }
      })
  }

  componentWillMount () {
    const { listView, getArticleViewList } = this.props
    if (listView && !listView.loaded) {
      this.constructor.getInitData()
        .then(data => getArticleViewList())
    }
  }

  componentWillUnmount () {
    //  执行清理工作
  }

  render () {
    const { listView } = this.props
    return (<div className="group-list">
      <h1>文章列表</h1>
      <ul>
        {listView.data.list.map((item, index) => {
          return (<li key={index}><Link to={'/frontend/article/' + item._id}>{item.title}</Link></li>)
        })}
      </ul>
    </div>)
  }
}

function mapStateToProps (state, ownProps) {
  return {
    listView: state.article.listView
  }
}

export default connect(mapStateToProps, {
  getArticleViewList
})(ArticleList)
