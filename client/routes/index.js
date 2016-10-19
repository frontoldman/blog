import React from 'react'
import {Route, IndexRoute, Redirect} from 'react-router'
import Layout from '../page/Layout'
import Login from '../page/Login'
import Admin from '../page/Admin'
import GroupList from '../page/group/List'
import GroupAdd from '../page/group/Add'
import GroupEdit from '../page/group/Edit'

export default (
  <Route path="/" component={Layout}>
    <IndexRoute component={Login} />
    <Route path="login" component={Login} />
    <Route path="admin" component={Admin}>
      <Route path="group" component={GroupList} />
      <Route path="group/add" component={GroupAdd} />
      <Route path="group/:id" component={GroupEdit} />
    </Route>
    <Redirect from="*" to="login" />
  </Route>
)
