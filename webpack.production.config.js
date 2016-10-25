const path = require('path');
const webpack = require('webpack');

const config = {
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss', '.css'],
  },
  entry: ['babel-polyfill', './src/index.jsx'],
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src'),
    }, {
      test: /\.s?css$/,
      loaders: [ 'style', 'css', 'sass' ],
    }],
    noParse: [/node_modules\/pixi.js/],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    })
  ]
};

module.exports = config;
