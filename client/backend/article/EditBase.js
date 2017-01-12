/**
 * Created by zhangran on 16/10/19.
 */

import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import Back from '../../component/Back/index'

export default class EditBase extends Component {
  constructor (props) {
    super(props)
    props.clearArticle()
    this.save = this.save.bind(this)
  }

  state = {
    title: this.props.detail.title || '',
    content: this.props.detail.content || '',
    tags: ''
  }

  componentWillReceiveProps (nextProps) {
    const { articleChanged, detail } = nextProps
    switch (articleChanged.status) {
      case 2:
        setTimeout(() => {
          browserHistory.push('/admin/article/')
        })
        break
      case 0:
      case 4:
        this.state.title = detail.title
        this.state.content = detail.content
        this.state.tags = detail.tags.join(' ') || ''
        break
    }
  }

  renderLoding () {
    var { status } = this.props.articleChanged
    switch (status) {
      case 1:
        return (<div className="flash">
          正在提交...
        </div>)
      case 2:
        return (<div className="flash">
          保存成功
        </div>)
      case 3:
        return (<div className="flash">
          保存失败
        </div>)
    }
  }

  render () {
    return (<div className="group-form">
      {this.renderLoding()}
      <form onSubmit={this.save}>
        <dl className="form-group">
          <dt><label>标题</label></dt>
          <dd><input className="form-control" value={this.state.title} onChange={ e => (this.setState({title: e.target.value}))} type="text" placeholder="输入标题" /></dd>
        </dl>
        <dl className="form-group">
          <dt><label>正文</label></dt>
          <dd>
            <textarea rows="20" className="form-control" value={this.state.content} onChange={ e => (this.setState({content: e.target.value}))} placeholder="输入正文"></textarea>
          </dd>
        </dl>
        <dl className="form-group">
          <dt><label>标签</label></dt>
          <dd><input className="form-control" value={this.state.tags} onChange={ e => (this.setState({tags: e.target.value}))} type="text" placeholder="输入标签用空格分隔" /></dd>
        </dl>
        <dl className="form-group">
          <dd>
            <button type="submit" className="btn btn-primary">保存</button>
            <Back></Back>
          </dd>
        </dl>
      </form>
    </div>)
  }
}
