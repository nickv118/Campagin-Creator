var path = require('path');
var webpack = require('webpack');
var APP_DIR = path.resolve(process.cwd(), 'app');


module.exports = {
  debug: true,
  devtool: 'source-map',

  entry: path.join(APP_DIR, 'app.js'),

  devServer: {
    contentBase: "./app",
  },

  output: {
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    path: 'app/__build__',
    publicPath: '/__build__/'
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.(png|jpg)$/, loader: 'url?limit=25000'}
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('shared.js')
  ]

};