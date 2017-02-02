/**
 * Created by zhangran on 16/9/22.
 */
import koaRouter from 'koa-router'
import React from 'react'
import {renderToString} from 'react-dom/server'
import {match, RouterContext} from 'react-router'
import {Provider} from 'react-redux'
import configureStore from '../../client/redux/store'
import routes from '../../client/routes'
import Html from './Html'
import constants from '../../client/redux/constants/'

const router = koaRouter()

const handleRender = function *(next) {
  const initialState = {}
  const store = configureStore(initialState)

  const _ctx = this
  const {url: location} = _ctx

  var matchResult = {}

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
    let isomorphicComponents = getAllIsomorphicComponents(renderProps.components)

    // 设置服务端渲染标志
    store.dispatch({
      type: constants.system.SERVER_RENDERED
    })

    // 初始化当前登录用户
    store.dispatch({
      type: constants.user.LOGIN_USER,
      data: this.session.user
    })

    yield fetchComponentData(
      store.dispatch,
      isomorphicComponents,
      renderProps.params,
      renderProps.location.query,
      _ctx.header)

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

function fetchComponentData(dispatch, components, params, query, header) {
  const promises = []
  components.forEach((current, index) => {
    if (current && current.WrappedComponent && current.WrappedComponent.getInitData) {
      promises.push(current.WrappedComponent.getInitData)
    }
  })

  const fetch = promises.map(promise => {
    return promise(params, header.cookie, dispatch, query)
  })

  return Promise.all(fetch)
}

function getAllIsomorphicComponents(defaultComponents) {
  var newComponents = []
  defaultComponents.forEach((current) => {
    if (current && current.WrappedComponent) {
      var {isomorphicComponents} = current.WrappedComponent
      if (Array.isArray(isomorphicComponents) && isomorphicComponents.length) {
        newComponents = newComponents.concat(isomorphicComponents)
      }
    }
  })

  return [
    ...newComponents,
    ...defaultComponents
  ]
}

/**
 * 解决非get 404到达这个页面
 */
router.get('/*', handleRender)

export default router.routes()
