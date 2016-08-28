const path = require('path');
const webpack = require('webpack');

const config = {
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss'],
  },
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'stage-0', 'react'],
        plugins: ['add-module-exports', 'transform-async-to-generator']
      },
      include: path.join(__dirname, 'src'),
    }, {
      test: /\.scss$/,
      loaders: ['style', 'css', 'sass'],
    }],
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
