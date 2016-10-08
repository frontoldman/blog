/**
 * Created by zhangran on 16/10/6.
 */

import React, {Component, PropTypes} from "react"
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { startRelease } from '../redux/actions/repository_detail/'

class RepositoryDetail extends Component {
  constructor(props) {
    super(props)
    this.handleReleaseClick = this.handleReleaseClick.bind(this)
    this.handleDownloadClick = this.handleDownloadClick.bind(this)
  }

  handleReleaseClick() {
    const { startRelease, params } = this.props
    startRelease({id: params.id})
  }

  handleDownloadClick() {

  }

  render() {
    const { repositoryRelease } = this.props

    var releaseClassName = 'pure-button'
    switch(repositoryRelease.status) {
      case 0:
        releaseClassName = 'pure-button pure-button-disabled'
        break;
      case 1:
        alert('发布成功')
        break;
    }

    return (<div className="pure-g">
      <div className="pure-u-1-2">
        <a className={releaseClassName} onClick={this.handleReleaseClick} href="javascript:void(0)">发布到正式环境</a>
      </div>
      <div className="pure-u-1-2">
        <a className="pure-button" onClick={this.handleDownloadClick} href="javascript:void(0)">下载发布版本</a>
      </div>
    </div>)
  }
}


function mapStateToProps(state, ownProps){
  return {
    repositoryRelease: state.repository.repositoryRelease
  }
}

export default connect(mapStateToProps, {
  startRelease
})(RepositoryDetail)


