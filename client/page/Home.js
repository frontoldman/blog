import React, {Component, PropTypes} from "react";
import { Link } from 'react-router'

export default class Home extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (<div>
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </div>)
  }
}