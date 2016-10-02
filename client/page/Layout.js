import React, {Component, PropTypes} from "react";
import "purecss";

export default class Layout extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      children
    } = this.props

    return (
      <div className="pure-g">
        <div className="pure-u-1-3">{children}</div>
        <div className="pure-u-1-3"><p>三分之一</p></div>
        <div className="pure-u-1-3"><p>三分之一</p></div>
      </div>
    )
  }

}