const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const imagesRoot = path.resolve(__dirname, 'src/worldcup/assets/images')
const imageFileName = 'img/[path][name].[ext]'

const fileLoaderOptions = {
  name: imageFileName,
  context: imagesRoot,
  esModule: false,
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : './',
  productionSourceMap: false,
  css: {
    extract: false,
  },
  chainWebpack: (config) => {
    config.module
      .rule('images')
      .use('url-loader')
      .tap((options) => ({
        ...options,
        limit: 0,
        fallback: {
          loader: require.resolve('file-loader'),
          options: fileLoaderOptions,
        },
      }))

    config.module
      .rule('svg')
      .use('file-loader')
      .tap((options) => ({
        ...options,
        ...fileLoaderOptions,
      }))

    config.module
      .rule('media')
      .use('url-loader')
      .tap((options) => ({
        ...options,
        limit: 0,
        fallback: {
          loader: require.resolve('file-loader'),
          options: fileLoaderOptions,
        },
      }))
  },
  configureWebpack: {
    output: {
      filename: 'js/build.js',
    },
    optimization: {
      splitChunks: false,
    },
    plugins: [
      new CopyWebpackPlugin([
        {
          from: imagesRoot,
          to: 'img',
          toType: 'dir',
          ignore: ['.DS_Store'],
        },
      ]),
    ],
  },
}
