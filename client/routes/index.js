import React from 'react'
import {Route, IndexRoute, Redirect} from 'react-router'
import Layout from '../page/Layout'
import Login from '../page/login/Login'
import Admin from '../page/Admin'
import Dashboard from '../page/dashboard/'
import GroupList from '../page/group/List'
import GroupAdd from '../page/group/Add'
import GroupEdit from '../page/group/Edit'
import User from '../page/user/List'
import UserAdd from '../page/user/Add'
import UserEdit from '../page/user/Edit'

export default (
  <Route path="/" component={Layout}>
    <IndexRoute component={Login} />
    <Route path="login" component={Login} />
    <Route path="admin" component={Admin}>
      <Route path="dashboard" component={Dashboard} />
      <Route path="group" component={GroupList} />
      <Route path="group/add" component={GroupAdd} />
      <Route path="group/:id" component={GroupEdit} />
      <Route path="user" component={User} />
      <Route path="user/add" component={UserAdd} />
      <Route path="user/:id" component={UserEdit} />
    </Route>
    <Redirect from="*" to="login" />
  </Route>
)
