/**
 * Created by zhangran on 16/9/24.
 */
import WebpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin'

export default {
  assets: {
    images: {
      extensions: ['png', 'jpg', 'jpeg', 'gif', 'ico', 'svg']
    },
    styles: {
      extensions: ['css'],
      filter(module, regex, options, log) {
        if (options.development) {
          return WebpackIsomorphicToolsPlugin.style_loader_filter(module, regex, options, log)
        }
        // in production mode there's no webpack "style-loader",
        // so the module.name will be equal to the asset path
        return regex.test(module.name)
      },
      path(module, options, log) {
        if (options.development) {
          return WebpackIsomorphicToolsPlugin.style_loader_path_extractor(module, options, log);
        }
        // in production mode there's no Webpack "style-loader",
        // so `module.name`s will be equal to correct asset paths
        return module.name
      },
      parser(module, options, log) {
        if (options.development) {
          return WebpackIsomorphicToolsPlugin.css_modules_loader_parser(module, options, log);
        }
        // In production mode there's Webpack Extract Text Plugin
        // which extracts all CSS text away, so there's
        // only CSS style class name map left.
        return module.source
      }
    }
  }
}