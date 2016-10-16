import React, { Component } from 'react'
import {Route, IndexRoute, Redirect} from 'react-router'
import Layout from '../page/Layout'
import Login from '../page/Login'
import Admin from '../page/Admin'
import GroupList from '../page/GroupList'
import GroupEdit from '../page/GroupEdit'

export default (
  <Route path="/" component={Layout}>
    <IndexRoute component={Login} />
    <Route path="login" component={Login} />
    <Route path="admin" component={Admin}>
      <Route path="group" component={GroupList} />
      <Route path="group/add" component={GroupEdit} />
    </Route>
    <Redirect from="*" to="login" />
  </Route>
)
