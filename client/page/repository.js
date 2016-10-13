import {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {getRepository} from '../redux/actions/repository/'

class Repository extends Component {
  constructor (props) {
    super(props)
  }

  render() {
    const {repositoryList} = this.props

    return (<div className="pure-g">
      {
        repositoryList.map((repository, index) => {
          return (<div className={"pure-u-1-" + repositoryList.length} key={index}>
            <Link to={"/repository/detail/" + repository.id}>{repository.name}</Link>
          </div>)
        })
      }
    </div>)
  }
}


function mapStateToProps(state, ownProps) {
  return {
    repositoryList: state.repository.repositoryList
  }
}

export default connect(mapStateToProps, {
  getRepository
})(Repository)


