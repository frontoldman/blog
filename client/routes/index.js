import React from "react";
import {Route, IndexRoute} from "react-router";
import Layout from "../page/Layout";
import Home from "../page/Home";
import About from "../page/About";

export default (
  <Route path="/" component={Layout}>
    <IndexRoute component={Home}/>
    <Route path="home" component={Home}></Route>
    <Route path="about" component={About}></Route>
  </Route>
)