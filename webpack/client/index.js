import koa from "koa";
import webpack from "webpack";
import koaWebpackDevMiddleware from "koa-webpack-dev-middleware";
import koaWebpackHotMiddleware from "koa-webpack-hot-middleware";
import {client} from '../../config'
import webpackClientConfig from "./client.config.js";
import webpackServerConfig from "./server.config.js";

var app = koa()
var compile = webpack(webpackClientConfig)

app.use(koaWebpackDevMiddleware(compile, {
  ...webpackServerConfig,
  publicPath: webpackClientConfig.output.publicPath
}))
app.use(koaWebpackHotMiddleware(compile))


app.listen(client.port, error => {
  if (error) {
    console.log(error)
    return;
  }
  console.log(`listening on ${client.port}`);
})


