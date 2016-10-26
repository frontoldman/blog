/**
 * Created by zhangran on 16/9/22.
 */
import React from 'react'
import {renderToString} from 'react-dom/server'
import {match, RouterContext} from 'react-router'
import {Provider} from 'react-redux'
import configureStore from '../../client/redux/store'
import routes from '../../client/routes'
import Html from './Html'

const handleRender = function *(next) {
  const initialState = {}
  const store = configureStore(initialState)

  const _ctx = this
  const {url: location} = _ctx

  var matchResult = {}

  // console.log(this.header.cookie)

  match({routes, location}, (error, redirectLocation, renderProps) => {
    matchResult = {
      error,
      redirectLocation,
      renderProps
    }
  })

  const {error, redirectLocation, renderProps} = matchResult

  if (error) {
    _ctx.status = 500
    _ctx.body = error.message
  } else if (redirectLocation) {
    _ctx.status = 302
    _ctx.redirect(`${redirectLocation.pathname}${redirectLocation.search}`)
  } else if (renderProps) {
    yield fetchComponentData(store.dispatch, renderProps.components, renderProps.params, _ctx.header)

    const component = (
      <Provider store={store}>
        <RouterContext {...renderProps}/>
      </Provider>
    )

    const assets = webpackIsomorphicTools.assets()

    _ctx.type = 'html'
    _ctx.status = 200
    _ctx.body = renderToString(<Html assets={assets} component={component} store={store}/>)
  }
}

function fetchComponentData (dispatch, components, params, header) {
  const promises = []
  components.forEach((current, index) => {
    if (current && current.WrappedComponent && current.WrappedComponent.getInitData) {
      promises.push(current.WrappedComponent.getInitData)
    }
  })

  const fetch = promises.map(promise => {
    return promise(params, header.cookie).then(action => dispatch({...action, loaded: true}))
  })

  return Promise.all(fetch)
}

export default handleRender
