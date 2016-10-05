import path from 'path'
import webpack from 'webpack'

module.exports = {
  devtool: 'eval',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss', '.css'],
  },
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    './src/index.jsx',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src'),
    }, {
      test: /\.scss$/,
      loaders: [ 'style', 'css', 'sass' ],
    }],
    noParse: [/node_modules\/pixi.js/],
  },
}
