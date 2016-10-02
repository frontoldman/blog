import React, {Component, PropTypes} from "react"
import { connect } from 'react-redux'
import { Link } from 'react-router'

import {getRepository} from '../redux/actions/home/'

class Home extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { repositoryList } = this.props

    return (<div className="pure-g">
      {
        repositoryList.map((repository, index) => {
          return (<div className={'pure-u-1-4'} key={index}>{repository.name}</div>)
        })
      }
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
})(Home)


