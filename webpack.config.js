const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VisualizerPlugin = require('webpack-visualizer-plugin')

const BUILD_DIR = path.resolve(__dirname, 'dist')
const APP_DIR = path.resolve(__dirname, 'src/ui')

const config = {
  entry: `${APP_DIR}/index.js`,
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${APP_DIR}/index.html`
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      },
      {
        test: /\.(gql)$/,
        exclude: /node_modules/,
        use: 'graphql-tag/loader'
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  }
}

if (process.env.NODE_ENV !== 'production') {
  config.plugins.push(new VisualizerPlugin())
}

module.exports = config
