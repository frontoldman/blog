/**
 * Created by zhangran on 17/1/13.
 */

import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { saveComment, getCommentList } from '../../redux/resouces/article/'
import constants from '../../redux/constants/'

class Comment extends Component {
  static propTypes = {
    articleId: PropTypes.any.isRequired
  }

  static getInitData (params, cookie, dispatch) {
    return getCommentList(params, cookie)
      .then(data => dispatch({
        type: constants.article.GET_COMMENT,
        data: data
      }))
  }

  constructor (props) {
    super(props)
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this)
    this.handleCommentChange = this.handleCommentChange.bind(this)
    this.state = {
      commentContent: ''
    }
    // getCommentList({articleId: props.articleId})
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

    })
  }

  render () {
    return (
      <div>
        <ul></ul>

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
  var id = ownProps.articleId
  var article = state.article.view.data.filter(article => id === article._id)
  var commentList = []
  var hasLoaded = false
  if (article.length) {
    commentList = article[0].commentList
    hasLoaded = true
  } else {
    commentList = []
    hasLoaded = false
  }

  return {
    article,
    hasLoaded,
    commentList
  }
}

// dispatch 可以放置到props上
function mapDispatchToProps (dispatch, ownProps) {
  return {
    dispatch,
    ...bindActionCreators({getCommentList}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)
