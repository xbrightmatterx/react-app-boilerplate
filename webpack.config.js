/* eslint-disable max-len, strict */
'use strict'

const execSync = require('child_process').execSync
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const TARGET = process.env.npm_lifecycle_event
// const VERSION = execSync('git rev-parse --short HEAD')

// Default config
let devtool = ''

let entry = { bundle: ['react-hot-loader/patch', './src/index.js'] }

let output = {
  path: path.join(__dirname, 'dist'),
  filename: '[name].js',
  publicPath: 'http://localhost:8080'
}

// Not currently using webpack for test so externals wont really work for us until we get that working
// Just using globals
let externals = {}

// TARGET overrides
switch (TARGET) {
  case 'start':
    devtool = 'cheap-module-eval-source-map'
    break
  case 'test':
    entry = ['./test/spec/index.js']
    output = {
      filename: 'test.bundle.js',
      path: 'dist/',
      publicPath: 'http://localhost:8081/tests/'
    }
    externals = [
      {
        'react/lib/ReactContext': 'window',
        'react/lib/ExecutionEnvironment': true
      }
    ]
    break
}

let plugins = [
  new webpack.DefinePlugin({
    __DEV__: TARGET !== 'build:webpack',
    'process.env.NODE_ENV': TARGET === 'build:webpack' ? JSON.stringify('production') : JSON.stringify(null)
  })
]

if (process.env.NODE_ENV === 'production') {
  plugins = plugins.concat([
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 51200
    })
  ])
}

if (process.env.NODE_ENV === 'staging') {
  plugins = plugins.concat([new webpack.optimize.DedupePlugin(), new webpack.optimize.OccurrenceOrderPlugin(true)])
}

module.exports = {
  devtool,
  entry,
  output,
  externals,
  module: {
    loaders: [
      {
        test: /\.js(x)?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        exclude: [],
        loader: ExtractTextPlugin.extract(
          'css?-autoprefixer&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!autoprefixer-loader?browsers=ie 10!sass'
        )
      },
      {
        test: /\.(png|jpg|svg)$/,
        loader: TARGET !== 'build:webpack' ? 'url' : `file?publicPath=`
      },
      { test: /\.json$/, loader: 'json' },
      { test: /fonts\/.*\.(woff(2)?|eot|ttf|svg)/, loader: 'file?name=fonts/[name].[ext]' }
    ]
  },
  // sassLoader: {
  //   data: `@import "${path.resolve(__dirname, 'src/theme/index.scss')}";`
  // },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.css', '.scss', '.coffee', '.json'],
    alias: {
      // src: path.join(__dirname, 'src'),
      // actions: path.join(__dirname, 'src/actions'),
      // components: path.join(__dirname, 'src/components'),
      // constants: path.join(__dirname, 'src/constants'),
      // ActionTypes: path.join(__dirname, 'src/constants/ActionTypes'),
      // i18n: path.join(__dirname, 'src/i18n'),
      // metrics: path.join(__dirname, 'src/metrics'),
      // reducers: path.join(__dirname, 'src/reducers'),
      // schemas: path.join(__dirname, 'src/schemas'),
      // routes: path.join(__dirname, 'src/routes'),
      // grid: 'flexboxgrid/dist/flexboxgrid.css',
      // assets: path.join(__dirname, 'src/assets'),
      // requests: path.join(__dirname, 'src/requests'),
      // lib: path.join(__dirname, 'src/lib'),
      // makona: path.join(__dirname, 'src/makona'),
      // fixtures: path.join(__dirname, 'test/fixtures')
    }
  },
  devServer: {
    contentBase: './dist',
    headers: { 'Access-Control-Allow-Origin': '*' }
  },
  plugins
}
