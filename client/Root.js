import React, { Component } from 'react'
import {Provider} from 'react-redux'
import {Router} from 'react-router'
import routes from './routes'

export default class Root extends Component {
  render () {
    const {history, store} = this.props
    return (< Provider store={store}>
      < Router history={history} routes={routes}/>
    </Provider>)
  }
}
