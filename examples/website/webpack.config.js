const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'entry.js'),
  output: {
    path: path.resolve(__dirname, '../../themes/weex/source/js'),
    filename: 'examples.min.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }, {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new UglifyJSPlugin()
  ]
}
