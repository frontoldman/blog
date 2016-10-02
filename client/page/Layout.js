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
      <div>
        {children}
      </div>
    )
  }

}