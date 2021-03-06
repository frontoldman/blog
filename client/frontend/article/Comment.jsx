/**
 * Created by zhangran on 17/1/13.
 */

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
// import { browserHistory } from 'react-router'
import { saveComment, getCommentList, zan, fan } from '../../redux/resouces/article/'
import constants from '../../redux/constants/'
import style from './Comment_style.less'
import util from '../../../util/'

class Comment extends Component {
  static propTypes = {
    articleId: PropTypes.any.isRequired
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
    location: React.PropTypes.object.isRequired
  }

  state = {
    commentContent: ''
  }

  static getInitData (params, cookie, dispatch) {
    return getCommentList({articleId: params.id}, cookie)
      .then(data => dispatch({
        type: constants.article.GET_COMMENT,
        data: data
      }))
  }

  constructor (props) {
    super(props)
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this)
    this.handleCommentChange = this.handleCommentChange.bind(this)
    this.handleZan = this.handleZan.bind(this)
    this.handleFan = this.handleFan.bind(this)
  }

  componentDidMount () {
    this.fetchData()
  }

  handleCommentChange (e) {
    this.setState({
      commentContent: e.target.value
    })
  }

  handleCommentSubmit () {
    saveComment({
      articleId: this.props.articleId,
      commentContent: this.state.commentContent
    }).then(data => {
      this.fetchData()
      this.setState({
        commentContent: ''
      })
    })
  }

  handleZan (commentId) {
    zan({commentId})
      .then(data => {
        if (data.nModified === 1) {
          this.fetchData()
        }
      })
  }

  handleFan (commentId) {
    fan({commentId})
      .then(data => {
        if (data.nModified === 1) {
          this.fetchData()
        }
      })
  }

  fetchData () {
    const { system, articleId, dispatch } = this.props
    if (system.serverRender.flag === 1) {
      this.constructor.getInitData({id: articleId}, null, dispatch)
    }
  }

  render () {
    const { comment } = this.props
    return (
      <div>
        <ul className={style.list}>
          {comment.map((item, index) => {
            return (<li className="border mt-3 mb-3" key={item._id}>
              <div className="clearfix">
                <div className={style.left}>{index + 1}楼 {util.timestampFormat(item.createTime, 'yyyy-MM-dd hh:mm')} | {item.creater.nickname}</div>
                <div className={style.right}>
                  <span onClick={e => this.handleZan(item._id)} className={style.zan + ' border-gray-light border bg-blue-light mr-3'}>赞同({item.zan.length})</span>
                  <span onClick={e => this.handleFan(item._id)} className={style.fan + ' border-gray-light border bg-blue-light'}>反对({item.fan.length})</span>
                </div>
              </div>
              <div className={style.content} dangerouslySetInnerHTML={{__html: item.content}}></div>
            </li>)
          })}
        </ul>

        <div className="mt-5">
          <form>
            <dl className="form-group">
              <dt><label>添加评论</label></dt>
              <dd>
                <textarea className="form-control input-block" onChange={this.handleCommentChange} value={this.state.commentContent} placeholder="支持markdown语法"></textarea>
              </dd>
            </dl>

            <div className="form-actions mt-2">
              <button type="button" onClick={this.handleCommentSubmit} className="btn btn-primary">提交评论</button>
              <button type="button" className="btn">取消</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  return {
    comment: state.article.comment,
    system: state.system
  }
}

// dispatch 可以放置到props上
function mapDispatchToProps (dispatch, ownProps) {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)
