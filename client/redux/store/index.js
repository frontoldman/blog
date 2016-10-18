import {createStore, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

const configureStoreProd = (initialState = {}) => {
  const finalCreateStore = compose(
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
