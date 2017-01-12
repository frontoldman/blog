/**
 * Created by zhangran on 17/1/10.
 */

import React, {Component, PropTypes} from 'react'
import style from './style.less'

export default class Page extends Component {
  static propTypes = {
    pageCount: PropTypes.number.isRequired,
    pageNumber: PropTypes.number.isRequired,
    pageChange: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props)

    this.state = {
      ...props,
      max: 9,
      beginPage: {
        start: 7,
        middle: 0,
        end: 2
      },
      middlePage: {
        start: 2,
        middle: 2,  // 当前页两侧各有2页
        end: 2
      },
      endPage: {
        start: 2,
        middle: 0,
        end: 7
      }
    }

    this.handlePageChange = this.handlePageChange.bind(this)
  }

  handlePageChange (e, index) {
    this.props.pageChange(index)
  }

  drawPageBtn (pagesEles, index, pageNumber) {
    var classNames = [style.page_no]
    if (pageNumber === index) {
      classNames.push(style.current)
    }
    pagesEles.push(<span onClick={e => this.handlePageChange(e, index)} className={classNames.join(' ')} key={index}>{index}</span>)
  }

  drawSketchBtns (index, pagesEles, pageRule) {
    const {pageNumber, pageCount} = this.props
    if (index <= pageRule.start) {
      this.drawPageBtn(pagesEles, index, pageNumber)
    } else if (index === pageRule.start + 1 && pageCount > this.state.max) {
      pagesEles.push(<span key={index}>...</span>)
    } else if (index > pageCount - pageRule.end) {
      this.drawPageBtn(pagesEles, index, pageNumber)
    }
  }

  getPages () {
    const {pageNumber, pageCount} = this.props
    var pagesEles = []
    var i
    for (i = 1; i <= pageCount; i++) {
      // 当前页小于开始最大页数
      if (pageNumber < this.state.beginPage.start) {
        this.drawSketchBtns(i, pagesEles, this.state.beginPage)
      } else if (pageNumber > pageCount - this.state.endPage.end + 1) {
        this.drawSketchBtns(i, pagesEles, this.state.endPage)
      } else {
        if (i <= this.state.middlePage.start) {
          this.drawPageBtn(pagesEles, i, pageNumber)
        } else if (i === this.state.middlePage.start + 1 && pageCount > this.state.max) {
          pagesEles.push(<span key={i}>...</span>)
        } else if (i >= pageNumber - this.state.middlePage.middle && i <= pageNumber + this.state.middlePage.middle) {
          this.drawPageBtn(pagesEles, i, pageNumber)
        } else if (i === pageNumber + this.state.middlePage.middle + 1 && pageCount > this.state.max) {
          pagesEles.push(<span key={i}>...</span>)
        } else if (i >= pageCount - this.state.middlePage.end) {
          this.drawPageBtn(pagesEles, i, pageNumber)
        }
      }
    }
    return pagesEles
  }

  render () {
    const {pageNumber, pageCount} = this.props

    return (
      <div className={style.page}>
        {
          pageNumber > 1
            ? <span onClick={e => this.handlePageChange(e, pageNumber - 1)} className={style.page_no}> ◄ </span>
            : <span className={[style.page_no, style.page_disabled].join(' ')}> ◄ </span>
        }
        {this.getPages()}
        {
          pageNumber < pageCount
            ? <span onClick={e => this.handlePageChange(e, pageNumber + 1)} className={style.page_no}> ► </span>
            : <span className={[style.page_no, style.page_disabled].join(' ')}> ► </span>
        }
      </div>
    )
  }
}
