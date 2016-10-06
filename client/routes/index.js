import React from "react"
import {Route, IndexRoute} from "react-router"
import Layout from "../page/Layout"
import Repository from "../page/Repository"
import RepositoryDetail from '../page/Repository_detail'

export default (
  <Route path="/" component={Layout}>
    <IndexRoute component={Repository}/>
    <Route path="repository" component={Repository}>
    </Route>
    <Route path="repository/detail/:id" component={RepositoryDetail} />
  </Route>
)