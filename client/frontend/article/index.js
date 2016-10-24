/**
 * Created by zhangran on 16/10/24.
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { getArticleList } from '../../redux/actions/article/'

class Artcile extends Component {
  componentDidMount () {
    // const { getArticle } = this.props
    // getArticle()
  }

  render () {
    return (<div className="group-list">
      文章详情
    </div>)
  }
}

function mapStateToProps (state, ownProps) {
  return {
  }
}

export default connect(mapStateToProps, {

})(Artcile)
