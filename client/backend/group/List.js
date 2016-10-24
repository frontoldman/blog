/**
 * Created by zhangran on 16/10/16.
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { getGroupList } from '../../redux/actions/group/'

class GroupList extends Component {
  componentDidMount () {
    const { getGroupList } = this.props
    getGroupList()
  }

  render () {
    const { list } = this.props.listData

    return (<div className="group-list">
      <div className="my-2 text-right">
        <Link to="/admin/group/add">
          <button className="btn btn-primary" type="button">新增</button>
        </Link>
      </div>
      <table className="border" style={{width: '100%'}}>
        <thead>
        <tr>
          <th className="border py-2 px-2">用户组名称</th>
          <th className="border py-2 px-2">描述</th>
          <th className="border py-2 px-2">操作</th>
        </tr>
        </thead>
        <tbody>

        {list.map(group => {
          return (<tr key={group._id}>
            <td className="border py-2 px-4">{group.name}</td>
            <td className="border py-2 px-4">{group.des}</td>
            <td className="border py-2 px-4 text-center">
              <Link to={'/admin/group/' + group._id}><button className="btn btn-primary" type="button">编辑</button></Link>
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
    listData: state.group.listData
  }
}

export default connect(mapStateToProps, {
  getGroupList
})(GroupList)
