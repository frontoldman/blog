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
import { getArticleViewList } from '../../redux/actions/article/'
import { getList } from '../../redux/resouces/article/'
import listStyle from './list_style.less'

class ArticleList extends Component {
  static getInitData (params = {}, cookie, dispatch, query = {}) {
    return getList({
      ...params,
      ...query
    }, cookie)
      .then(data => dispatch({
        type: constants.article.GET_LIST_VIEW_SUCCESS,
        data: data
      }))
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)
    if (props.location.action === 'PUSH') {
      this.getList(props.location.query.pageNumber)
    }
    this.changePage = this.changePage.bind(this)
  }

  changePage (pageNumber) {
    this.context.router.replace(`/frontend/article?pageNumber=${pageNumber}`)
    this.getList(pageNumber)
  }

  getList (pageNumber) {
    this.constructor.getInitData({
      pageNumber
    }, null, this.props.dispatch)
  }

  componentWillUnmount () {

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
      getArticleViewList
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList)
