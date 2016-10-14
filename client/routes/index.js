import React, { Component } from 'react'
import {Route, IndexRoute} from 'react-router'
import Layout from '../page/Layout'
import Login from '../page/Login'

export default (
  <Route path="/" component={Layout}>
    <IndexRoute component={Login}/>
    <Route path="login" component={Login}>
    </Route>
  </Route>
)
