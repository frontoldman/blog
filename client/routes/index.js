import React from 'react'
import {Route, IndexRoute, Redirect} from 'react-router'
import Layout from '../backend/Layout'
import Login from '../backend/login/Login'
import Admin from '../backend/Admin'
import Dashboard from '../backend/dashboard/'
import GroupList from '../backend/group/List'
import GroupAdd from '../backend/group/Add'
import GroupEdit from '../backend/group/Edit'
import User from '../backend/user/List'
import UserAdd from '../backend/user/Add'
import UserEdit from '../backend/user/Edit'
import Article from '../backend/article/List'
import ArticleAdd from '../backend/article/Add'
import ArticleEdit from '../backend/article/Edit'

import ArticleList from '../frontend/article/list'
import ArticleView from '../frontend/article/view'

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
      <Route path="article" component={Article} />
      <Route path="article/add" component={ArticleAdd} />
      <Route path="article/:id" component={ArticleEdit} />
    </Route>
    <Route path="frontend">
      <Route path="article" component={ArticleList} />
      <Route path="article/:id" component={ArticleView} />
    </Route>
    <Redirect from="*" to="login" />
  </Route>
)
