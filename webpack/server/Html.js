/**
 * Created by zhangran on 16/9/22.
 */

import React, { Component, PropTypes } from 'react'
import { renderToString } from 'react-dom/server'

export default class Html extends Component {

  get scripts() {
    const { javascript } = this.props.assets

    return Object.keys(javascript).map((script, i) =>
      <script src={'http://localhost:8888' + javascript[script]} key={i} />
    )
  }

  render() {
    const { component, store } = this.props

    return (
      <html>
      <head>
        <meta charSet="utf-8" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <title>React Redux Universal Boilerplate</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>

      <body>
      <div id="root" dangerouslySetInnerHTML={{ __html: renderToString(component) }} />
      <script dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__=${JSON.stringify(store.getState())};` }} />
      {this.scripts}
      </body>
      </html>
    )
  }

}