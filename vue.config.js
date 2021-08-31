'use strict'
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = process.env.VUE_APP_TITLE // page title

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following methods:
// port = 9528 npm run dev OR npm run dev --port = 9528
const port = process.env.port || process.env.npm_config_port || 9528 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: process.env.BASE_URL,
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  // css: {
  //   extract: false
  // },
  devServer: {
    host: 'local.xxxx.com',
    port,
    disableHostCheck: true,
    hot: true,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    // before: require('./mock/mock-server.js')
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name,
    devtool: process.env.NODE_ENV === "production" ? false : "cheap-source-map",
    resolve: {
      alias: {
        '@': resolve('src'),
        '@mock': resolve('src/mock'),
        '@api': resolve('src/api'),
        '@assets': resolve('src/assets'),
        '@utils': resolve('src/utils'),
        '@mixin': resolve('src/mixins'),
        '@comp': resolve('src/components'),
        '@view': resolve('src/views'),
      }
    },
    optimization: {
      minimize: process.env.NODE_ENV === "production" ? true : false,
    },
    /* output: {
      library: `${name}`,
      filename: '[name].[chunkhash].js',
      // libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${name}`
    },
    externals: {
      'vue': 'Vue',
      'element-ui': 'ELEMENT',
    } */
  },
  chainWebpack(config) {
    // it can improve the speed of the first screen, it is recommended to turn on preload
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete('prefetch')

    config
      .when(process.env.NODE_ENV === 'development', config => {
        config.optimization.minimizer('terser').tap((args) => {
          args[0].terserOptions.sourceMap = true
          return args
        })
      })

    config
      .when(process.env.NODE_ENV !== 'development', config => {
        config.optimization.minimizer('terser').tap((args) => {
          // 注释console.*
          // args[0].terserOptions.compress.drop_console = true
          // remove debugger
          args[0].terserOptions.compress.drop_debugger = true
          // 移除 console.log
          args[0].terserOptions.compress.pure_funcs = ['console.log']
          // 去掉注释 如果需要看chunk-vendors公共部分插件，可以注释掉就可以看到注释了
          args[0].terserOptions.output = {
              comments: false
          };
          return args
        })
        config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
            // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
