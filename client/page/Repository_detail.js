/**
 * Created by zhangran on 16/10/6.
 */

import React, {Component, PropTypes} from "react"
import { connect } from 'react-redux'
import { Link } from 'react-router'

import {getRepository} from '../redux/actions/home/'

class RepositoryDetail extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { repositoryList } = this.props

    return (<div className="pure-u-1">
        详情页面
    </div>)
  }
}


function mapStateToProps(state, ownProps){
  return {
    repositoryList: state.home.repositoryList
  }
}

export default connect(mapStateToProps, {
  getRepository
})(RepositoryDetail)


