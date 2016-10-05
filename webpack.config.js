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
    },
    {
      test: /\.(png|jpg)$/,
      loaders: ['url?limit=100000'],
      include: path.join(__dirname, 'assets'),
    },
    // pixi uses fs.readFileSync and require()s json files
    {
      test: /\.js$/,
      loaders: ['transform?brfs'],
      include: /node_modules/,
    }, {
      test: /\.json$/,
      loaders: ['json'],
    }],
    noParse: [/node_modules\/pixi.js/],
  },
}
