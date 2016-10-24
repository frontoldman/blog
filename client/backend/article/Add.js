/**
 * Created by zhangran on 16/10/16.
 */

import {connect} from 'react-redux'

import EditBase from './EditBase'
import { addArticle, clearArticle } from '../../redux/actions/article/'

class GroupAdd extends EditBase {
  save (event) {
    const { addArticle } = this.props
    const { title, content, tags } = this.state
    event.preventDefault()
    addArticle(title, content, tags)
  }
}

function mapStateToProps (state, ownProps) {
  return {
    articleChanged: state.article.changed,
    detail: state.article.detail
  }
}

export default connect(mapStateToProps, {
  addArticle,
  clearArticle
})(GroupAdd)
