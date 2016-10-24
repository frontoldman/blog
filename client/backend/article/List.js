/**
 * Created by zhangran on 16/10/16.
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { getArticleList } from '../../redux/actions/article/'

class GroupList extends Component {
  componentDidMount () {
    const { getArticleList } = this.props
    getArticleList()
  }

  render () {
    const { list } = this.props.listData

    return (<div className="group-list">
      <div className="my-2 text-right">
        <Link to="/admin/article/add">
          <button className="btn btn-primary" type="button">新增</button>
        </Link>
      </div>
      <table className="border" style={{width: '100%'}}>
        <thead>
        <tr>
          <th className="border py-2 px-2">标题</th>
          <th className="border py-2 px-2">操作</th>
        </tr>
        </thead>
        <tbody>

        {list.map(article => {
          return (<tr key={article._id}>
            <td className="border py-2 px-4">{article.title}</td>
            <td className="border py-2 px-4 text-center">
              <Link to={'/admin/article/' + article._id}><button className="btn btn-primary" type="button">编辑</button></Link>
              <button className="btn btn-danger ml-1" type="button">删除</button>
            </td>
          </tr>)
        })}

        </tbody>
      </table>
    </div>)
  }
}

function mapStateToProps (state, ownProps) {
  return {
    listData: state.article.listData
  }
}

export default connect(mapStateToProps, {
  getArticleList
})(GroupList)
