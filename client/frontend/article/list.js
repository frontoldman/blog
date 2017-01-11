/**
 * Created by zhangran on 16/10/25.
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import Page from '../../component/Page/index'
import util from '../../../util/'
import constants from '../../redux/constants/'
import { getArticleViewList, clearArticleList } from '../../redux/actions/article/'
import { getList } from '../../redux/resouces/article/'
import listStyle from './list_style.less'

class ArticleList extends Component {
  static getInitData (params, cookie, dispatch) {
    return getList(params, cookie)
      .then(data => dispatch({
        type: constants.article.GET_LIST_VIEW_SUCCESS,
        data: data
      }))
  }

  constructor (props) {
    super(props)
    this.state = {
      __init__: false
    }
  }

  componentWillMount () {
    if (this.state.__init__) {
      this.constructor.getInitData({}, null, this.props.dispatch)
    }
    this.setState({'__init__': true})
  }

  changePage (pageNumber) {
    console.log(pageNumber)
  }

  componentWillUnmount () {
    // //  执行清理工作
    // const { clearArticleList } = this.props
    // clearArticleList()
  }

  render () {
    const { listView } = this.props
    return (<div className="group-list">
      <h1 className={listStyle.title}>文章列表</h1>
      <ul className={listStyle.article_list}>
        {listView.list.map((item, index) => {
          return (
            <li key={index}>
              <Link to={'/frontend/article/' + item._id}>{item.title}</Link>
              <span className={listStyle.owner}>
                <span>{item.creater.nickname}</span>
                &nbsp;发表于&nbsp;
                <span>{util.timestampFormat(item.createTime, 'yyyy-MM-dd hh:mm')}</span>
              </span>
            </li>)
        })}
      </ul>
      <div className={listStyle.page}>
        <Page pageChange={this.changePage} pageCount={listView.page.pageCount} pageNumber={listView.page.pageNumber}></Page>
      </div>
    </div>)
  }
}

function mapStateToProps (state, ownProps) {
  return {
    listView: state.article.listView.data
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  return {
    dispatch,
    ...bindActionCreators({
      getArticleViewList,
      clearArticleList
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList)
