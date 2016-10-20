/**
 * Created by zhangran on 16/10/16.
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { getUserList } from '../../redux/actions/user/'

class UserList extends Component {
  componentDidMount () {
    const { getUserList } = this.props
    getUserList()
  }

  render () {
    const { list } = this.props.listData

    return (<div className="group-list">
      <div className="my-2 text-right">
        <Link to="/admin/user/add">
          <button className="btn btn-primary" type="button">新增</button>
        </Link>
      </div>
      <table className="border" style={{width: '100%'}}>
        <thead>
        <tr>
          <th className="border py-2 px-2">用户名</th>
          <th className="border py-2 px-2">昵称</th>
          <th className="border py-2 px-2">所属用户组</th>
          <th className="border py-2 px-2">操作</th>
        </tr>
        </thead>
        <tbody>

        {list.map(user => {
          return (<tr key={user._id}>
            <td className="border py-2 px-4">{user.username}</td>
            <td className="border py-2 px-4">{user.nickname}</td>
            <td className="border py-2 px-4">{user.group && user.group.name}</td>
            <td className="border py-2 px-4 text-center">
              <Link to={'/admin/user/' + user._id}><button className="btn btn-primary" type="button">编辑</button></Link>
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
    listData: state.user.listData
  }
}

export default connect(mapStateToProps, {
  getUserList
})(UserList)
