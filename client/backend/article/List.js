/**
 * Created by zhangran on 16/10/16.
 */

import React, { Component } from 'react'
import { Link } from 'react-router'
import Page from '../../component/Page/index'
import { getOwnerList } from './resources'

export default class GroupList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [],
      page: {
        pageCount: 1,
        pageNumber: 1
      }
    }

    this.changePage = this.changePage.bind(this)
  }

  componentDidMount () {
    this.getList(this.state.page.pageNumber)
  }

  getList (pageNumber) {
    getOwnerList({pageNumber})
      .then(data => this.setState({
        list: data.list,
        page: data.page
      }))
  }

  changePage (index) {
    this.getList(index)
  }

  render () {
    const { list, page } = this.state

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
      <br/>
      <Page pageChange={this.changePage} pageCount={page.pageCount} pageNumber={page.pageNumber}></Page>
    </div>)
  }
}
