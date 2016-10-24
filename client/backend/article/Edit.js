/**
 * Created by zhangran on 16/10/16.
 */

import {connect} from 'react-redux'

import EditBase from './EditBase'
import { getDetail, saveDetail, clearArticle } from '../../redux/actions/article/'

class GroupEdit extends EditBase {
  componentDidMount () {
    const { getDetail, routeParams } = this.props
    getDetail(routeParams.id)
  }

  save (event) {
    const { detail, saveDetail } = this.props
    const { title, content, tags } = this.state
    event.preventDefault()
    saveDetail(detail._id, title, content, tags)
  }
}

function mapStateToProps (state, ownProps) {
  return {
    articleChanged: state.article.changed,
    detail: state.article.detail
  }
}

export default connect(mapStateToProps, {
  getDetail,
  saveDetail,
  clearArticle
})(GroupEdit)
