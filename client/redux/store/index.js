import {createStore, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
// import createLogger from 'redux-logger'
import rootReducer from '../reducers'

// const logger = createLogger()
const configureStoreProd = (initialState = window.__INITIAL_STATE__) => {
  const finalCreateStore = compose(
    // applyMiddleware(thunk, logger)
    applyMiddleware(thunk)
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
