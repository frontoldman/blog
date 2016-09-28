/**
 * Created by zhangran on 16/9/22.
 */
import React from "react";
import {renderToString} from "react-dom/server";
import {match, RouterContext} from "react-router";
import {Provider} from "react-redux";
import configureStore from "../../client/redux/store";
import routes from "../../client/routes";
import Html from "./Html";

const handleRender = function *(ctx) {

  const initialState = {}
  const store = configureStore(initialState)

  const _ctx = this
  const {url: location} = _ctx

  match({routes, location}, (error, redirectLocation, renderProps) => {
    if (error) {
      _ctx.status = 500
      _ctx.body = error.message
    } else if (renderProps) {
      const component = (
        <Provider store={store}>
          <RouterContext {...renderProps}/>
        </Provider>
      )

      const assets = webpackIsomorphicTools.assets()

      _ctx.type = 'html'
      _ctx.status = 200
      _ctx.body = renderToString(<Html assets={assets} component={component} store={store}/>)
    }

  })

}

export default handleRender