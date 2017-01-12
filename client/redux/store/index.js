import {createStore, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'

const middlewares = []
const logger = createLogger()

middlewares.push(thunk)
// 服务器端不打印redux-log
typeof window !== 'undefined' ? middlewares.push(logger) : ''

const configureStoreProd = (initialState = window.__INITIAL_STATE__) => {
  const finalCreateStore = compose(
    applyMiddleware(...middlewares)
  )(createStore)

  const store = finalCreateStore(rootReducer, initialState)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default // eslint-disable-line
      store.replaceReducer(nextReducer)
    })
  }

  return store
}

export default configureStoreProd
