/**
 * Created by zhangran on 16/9/9.
 */

import React from 'react'
import ReactDOM from 'react-dom'
import {browserHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import configureStore from './redux/store/index'
import Root from './Root'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)
const root = (<Root history={history} store={store}/>)

ReactDOM.render(root, document.getElementById('root'))

